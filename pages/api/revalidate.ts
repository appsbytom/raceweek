import prisma from '@/lib/prisma'
import SERIES_CONFIG from '@/series/config'
import { getAllEvents } from '@/series/fetcher-config'
import dayjs from 'dayjs'
import type { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.headers.token !== process.env.REVALIDATE_TOKEN) {
    return res.status(401).json({ message: 'invalid token' })
  }

  try {
    const [_, [, confirmedEvents]] = await Promise.all([res.revalidate('/'), getAllEvents(), prisma.sessionReminder.deleteMany({})])
    await prisma.sessionReminder.createMany({
      data: confirmedEvents
        .flatMap(event => event.sessions
          .filter(session => !session.unconfirmed && dayjs(session.startTime).isAfter(dayjs()))
          .map(session => {
            const id = `${event.series}-${session.id}`
            const title = `${SERIES_CONFIG[event.series].name}: ${event.name}`
            const body = `${session.name} starts in a few minutes`
            const scheduledFor = dayjs(session.startTime).subtract(5, 'minutes').unix()
            return {
              id,
              title,
              body,
              scheduledFor,
              topic: `${event.series}-${session.type}`
            }
          })
        )
    })
    return res.json({ revalidated: true })
  } catch (err) {
    return res.status(500).json({ message: 'server error' })
  }
}

export default handler