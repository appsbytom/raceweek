import prisma from '@/lib/prisma'
import { Series, Type } from '@/types/event'
import axios from 'axios'
import cheerio from 'cheerio'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

const utcFormat = date => dayjs.utc(date).format()

const CONSOLE_WRAPPER = '---------- WSERIES SCRAPER ----------'

const main = async () => {
  console.log(CONSOLE_WRAPPER)
  console.log('Started scraping events')

  const { data } = await axios.get('https://wseries.com')
  const $ = cheerio.load(data)

  const events = await Promise.all($('a.race').map((i, el) => {
    const element = $(el)
    const link = element.attr('href')
    const status = element.find('span.race__status').text().trim()
    const name = element.find('h3.race__name').text().trim()

    return { link, status, name, id: new URL(link).pathname.split('/')[2] }
  })
    .get()
    .filter(event => !event.status)
    .map(async event => {
      const { data } = await axios.get(event.link)
      const $ = cheerio.load(data)
      const { practiceStart, practiceEnd, qualifyingStart, qualifyingEnd, raceStart, raceEnd } = $('div.countdown').data() as Record<string, string>
      return {
        id: event.id,
        name: event.name,
        sessions: [
          {
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
        ],
        series: Series.WSeries
      }
  }));

  console.log('Finished scraping events, starting upserts on %s', events.map(event => event.id).join(', '))
  await prisma.$transaction(
    events.map(event => prisma.event.upsert({
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

  console.log('Finished upserting events')
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