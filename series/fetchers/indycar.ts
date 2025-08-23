import prisma from '@/lib/prisma'
import { Type } from '@/types/session'
import { Series } from '../config'

const sessionMap = {
  p: Type.Practice,
  q: Type.Qualifying,
  r: Type.Race
}

export default async () => {
  const events = await prisma.event.findMany({ where: { series: Series.IndyCar }, include: { sessions: true }});
  return events.map(event => ({
    ...event,
    sessions: event.sessions.map(session => ({
      ...session,
      type: sessionMap[session.type],
      startTime: session.startTime.toISOString(),
      endTime: session.endTime.toISOString()
    })),
    series: Series.IndyCar,
    raceDate: event.raceDate.toISOString()
  }))
}