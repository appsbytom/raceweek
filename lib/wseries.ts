import { Event, Series, Type } from '@/types/event'
import { getFutureEvents } from '@/utils/events'
import dayjs from 'dayjs'
import prisma from './prisma'

const sessionMap = {
  'p': Type.Practice,
  'q': Type.Qualifying,
  'r': Type.Race
}

export const getEvents = async (): Promise<Event[]> => {
  const events = (await prisma.event.findMany({
    include: {
      sessions: {
        select: { id: true, name: true, type: true, unconfirmed: true, startTime: true, endTime: true },
        orderBy: { startTime: 'asc' }
      }
    },
    where: { series: Series.WSeries }
  }))
    .sort((a, b) => Number(a.sessions[0].startTime) - Number(b.sessions[0].startTime))
    .map(event => ({
      ...event,
      sessions: event.sessions.map(session => ({
        ...session,
        type: sessionMap[session.type],
        startTime: session.startTime.toISOString(),
        endTime: session.endTime.toISOString()
      })),
      series: Series.WSeries
    }))

  return getFutureEvents(events)
}