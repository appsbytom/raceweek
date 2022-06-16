import Event, { Series } from '@/types/event'
import { Type } from '@/types/session'
import prisma from './prisma'

const sessionMap = {
  p: Type.Practice,
  q: Type.Qualifying,
  r: Type.Race
}

export const getEvents = async (): Promise<Event[]> => {
  return (await prisma.event.findMany({
    include: {
      sessions: {
        select: { id: true, name: true, type: true, unconfirmed: true, startTime: true, endTime: true }
      }
    },
    where: { series: Series.WSeries }
  }))
    .map(event => ({
      ...event,
      sessions: event.sessions.map(session => ({
        ...session,
        type: sessionMap[session.type],
        startTime: session.startTime.toISOString(),
        endTime: session.endTime.toISOString()
      })),
      series: Series.WSeries,
      raceDate: event.raceDate.toISOString()
    }))
}