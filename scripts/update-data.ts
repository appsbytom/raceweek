import prisma from '@/lib/prisma'
import SERIES_CONFIG from '@/series/config'
import { getAllEvents } from '@/series/fetcher-config'
import axios from 'axios'
import dayjs from 'dayjs'

const CONSOLE_WRAPPER = '---------- UPDATE DATA ----------'

const main = async () => {
  console.log(CONSOLE_WRAPPER)

  await prisma.$transaction((await getAllEvents()).filter(event => !event.provisional).flatMap(event => event.sessions.filter(session => !session.unconfirmed && dayjs(session.startTime).isAfter(dayjs())).map(session => {
    const id = `${event.series}-${session.id}`
    const title = `${session.name} starts in 5 minutes`
    const body = `${SERIES_CONFIG[event.series].name}: ${event.name}`
    const scheduledFor = dayjs(session.startTime).subtract(5, 'minutes').unix()
    return prisma.sessionReminder.upsert({
      where: { id },
      create: {
        id,
        title,
        body,
        scheduledFor,
        topic: `${event.series}-${session.type}`
      },
      update: {
        title,
        body,
        scheduledFor
      }
    })
  })))

  try {
    await axios.get(`${process.env.APP_URL}/api/revalidate`, { headers: { token: process.env.TOKEN }})
    console.log('Revalidated!')
  } catch (e) {
    console.log('Failed to revalidate:', e.response.data.message)
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