import prisma from '@/lib/prisma'
import { Series } from '@/types/event'
import { Type } from '@/types/session'
import axios from 'axios'
import cheerio, { Cheerio, Element } from 'cheerio'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'

dayjs.extend(customParseFormat)
dayjs.extend(timezone)
dayjs.extend(utc)

const getISO = (date: string, time: string, timezone: string) => dayjs.tz(`${date} ${time}`, 'D MMMM HH:mm', timezone).toISOString()

const getTrimmedText = (element: Cheerio<Element>) => element.text().trim()

const getSessionType = (name: string): Type => {
  if (name.includes('Practice')) return Type.Practice
  else if (name.includes('Qualifying')) return Type.Qualifying
  else return Type.Race
}

const CONSOLE_WRAPPER = '---------- WSERIES SCRAPER ----------'
const DUMMY = 'dummy'

const main = async () => {
  console.log(CONSOLE_WRAPPER)
  await prisma.event.create({ data: { id: DUMMY, name: DUMMY, series: DUMMY, raceDate: '1970-01-01T00:00:00.000Z' }})

  const { data } = await axios.get<string>('https://wseries.com')
  const $ = cheerio.load(data)
  const events = $('a.race').map((i, el) => {
    const element = $(el)
    const link = element.attr('href')
    const status = getTrimmedText(element.find('.race__status'))
    const name = getTrimmedText(element.find('.race__name'))

    return {
      link,
      status,
      name,
      id: new URL(link).pathname.split('/')[2],
      date: dayjs.utc(getTrimmedText(element.find('.race__date span').last()), 'DD MMMM').format()
    }
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
        const timezone = ($('.race__schedule__toggle[data-value=local]').data('timezone') as string).replace(/\b\w|_\w/g, match => match.toUpperCase())
        const sessions = $('.table--local tbody tr').map((i, el) => {
          const element = $(el)
          const name = getTrimmedText(element.find('.race__schedule__table__title'))
          const nameNumberMatch = name.match(/\d$/)
          const sessionType = getSessionType(name)
          const date = getTrimmedText(element.find('.race__schedule__table__date'))
          const [startTime, endTime] = getTrimmedText(element.find('.race__schedule__table__time')).split('–')
          return {
            id: nameNumberMatch ? `${sessionType}-${nameNumberMatch[0]}` : sessionType,
            name,
            type: sessionType,
            startTime: getISO(date, startTime, timezone),
            endTime: getISO(date, endTime, timezone)
          }
        }).get()
        return {
          id: event.id,
          name: event.name,
          sessions,
          series: Series.WSeries,
          raceDate: event.date
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

  await prisma.event.delete({ where: { id: DUMMY }})
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