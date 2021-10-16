import prisma from '@/lib/prisma'
import { Series } from '@/types/event'
import { Type } from '@/types/session'
import axios from 'axios'
import cheerio from 'cheerio'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

const utcFormat = date => dayjs.utc(date).format()

const CONSOLE_WRAPPER = '---------- WSERIES SCRAPER ----------'

const main = async () => {
  console.log(CONSOLE_WRAPPER)

  const { data } = await axios.get('https://wseries.com')
  const $ = cheerio.load(data)
  const events = $('a.race').map((i, el) => {
    const element = $(el)
    const link = element.attr('href')
    const status = element.find('span.race__status').text().trim()
    const name = element.find('h3.race__name').text().trim()

    return { link, status, name, id: new URL(link).pathname.split('/')[2] }
  }).get().filter(event => event.id);
  console.log('Scraped events, found: %s', events.map(event => event.id).join(', '))

  const [{ count: deletedSessionsCount }, { count: deletedEventsCount }] = await prisma.$transaction([
    prisma.session.deleteMany({
      where: {
        NOT: events.map(event => ({
          eventId: event.id
        }))
      }
    }),
    prisma.event.deleteMany({
      where: {
        NOT: events.map(event => ({
          id: event.id
        })),
        series: Series.WSeries
      }
    })
  ])
  if (!deletedEventsCount && !deletedSessionsCount) {
    console.log('No events cancelled, nothing deleted')
  } else {
    console.log('Deleted %i cancelled events with %i associated sessions', deletedEventsCount, deletedSessionsCount)
  }

  const eventsWithSessions = await Promise.all(events
    .filter(event => !event.status)
    .map(async event => {
      const { data } = await axios.get(event.link)
      const $ = cheerio.load(data)
      const { practiceStart, practiceEnd, qualifyingStart, qualifyingEnd, raceStart, raceEnd } = $('div.countdown').data() as Record<string, string>
      return {
        id: event.id,
        name: event.name,
        sessions: [
          (practiceStart && practiceEnd) && {
            id: Type.Practice,
            name: 'Practice',
            type: Type.Practice,
            startTime: utcFormat(practiceStart),
            endTime: utcFormat(practiceEnd)
          },
          {
            id: Type.Qualifying,
            name: 'Qualifying',
            type: Type.Qualifying,
            startTime: utcFormat(qualifyingStart),
            endTime: utcFormat(qualifyingEnd)
          },
          {
            id: Type.Race,
            name: 'Race',
            type: Type.Race,
            startTime: utcFormat(raceStart),
            endTime: utcFormat(raceEnd)
          }
        ].filter(Boolean),
        series: Series.WSeries
      }
    }))
  const joinedEventIds = eventsWithSessions.map(event => event.id).join(', ')
  console.log('Scraped sessions data for: %s', joinedEventIds)

  await prisma.$transaction(
    eventsWithSessions.map(event => prisma.event.upsert({
      where: { id: event.id },
      update: {
        name: event.name,
        sessions: {
          upsert: event.sessions.map(session => ({
            where: { id_eventId: { id: session.id, eventId: event.id } },
            update: { startTime: session.startTime, endTime: session.endTime },
            create: session
          }))
        }
      },
      create: {
        ...event,
        sessions: { create: event.sessions }
      }
    }))
  )
  console.log('Upserted %s with scraped event and sessions data', joinedEventIds)

  console.log(CONSOLE_WRAPPER)
}

main()
  .catch(reason => {
    console.error(reason)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })