import prisma from '@/lib/prisma'
import Event from '@/types/event'
import { Type } from '@/types/session'
import { Series } from '../config'

const sessionMap = {
  p: Type.Practice,
  q: Type.Qualifying,
  r: Type.Race
}

export const getEvents = async (series: Series): Promise<Event[]> => {
  const events = await prisma.event.findMany({ where: { series }, include: { sessions: true }});
  return events.map(event => ({
    ...event,
    sessions: event.sessions.map(session => ({
      ...session,
      type: sessionMap[session.type],
      startTime: session.startTime.toISOString(),
      endTime: session.endTime.toISOString()
    })),
    series: series,
    raceDate: event.raceDate.toISOString()
  }))
}