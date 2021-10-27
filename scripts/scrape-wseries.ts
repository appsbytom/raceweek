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

  const { data } = await axios.get<string>('https://wseries.com')
  const $ = cheerio.load(data)
  const events = $('a.race').map((i, el) => {
    const element = $(el)
    const link = element.attr('href')
    const status = element.find('span.race__status').text().trim()
    const name = element.find('h3.race__name').text().trim()

    return { link, status, name, id: new URL(link).pathname.split('/')[2] }
  }).get().filter(event => event.id);

  const sessionIds = events.map(event => ({ eventId: event.id }))
  const eventIds = events.map(event => ({ id: event.id }))
  const uncompletedEvents = events.filter(event => !event.status)
  if (uncompletedEvents.length === 0) {
    const [{ count: deletedSessionsCount }, { count: deletedEventsCount }] = await prisma.$transaction([
      prisma.session.deleteMany({ where: { OR: sessionIds }}),
      prisma.event.deleteMany({ where: { OR: eventIds, series: Series.WSeries }})
    ])
    const message = 'Season complete!'
    if (!deletedEventsCount && !deletedSessionsCount) {
      console.log(message)
    } else {
      console.log('%s Deleted all data (%i events and %i sessions)', message, deletedEventsCount, deletedSessionsCount)
    }
  } else {
    console.log('Scraped events, found: %s', events.map(event => event.id).join(', '))

    const [{ count: deletedSessionsCount }, { count: deletedEventsCount }] = await prisma.$transaction([
      prisma.session.deleteMany({ where: { NOT: sessionIds }}),
      prisma.event.deleteMany({ where: { NOT: eventIds, series: Series.WSeries } })
    ])
    if (!deletedEventsCount && !deletedSessionsCount) {
      console.log('No events cancelled, nothing deleted')
    } else {
      console.log('Deleted %i cancelled events with %i associated sessions', deletedEventsCount, deletedSessionsCount)
    }

    const eventsWithSessions = await Promise.all(uncompletedEvents
      .map(async event => {
        const { data } = await axios.get<string>(event.link)
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
            (qualifyingStart && qualifyingEnd) && {
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
  }

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