import { getFutureRaces } from '@/utils/races'
import axios from 'axios'
import { Race, Series, Session, Type } from '@/types/race'
import { EventsResponse, SessionsResponse } from './types'

const f1Client = axios.create({ baseURL: 'https://api.formula1.com/v1', headers: { apikey: process.env.F1_KEY }})

export const getRaces = async (): Promise<Race[]> => {
  const { data } = await f1Client.get<EventsResponse>('/editorial-eventlisting/events')

  const races = await Promise.all(data.events
    .filter(race => race.type === 'race')
    .map(async race => ({
      id: race.meetingKey,
      name: race.meetingName,
      sessions: await getSessions(race.meetingKey),
      provisional: race.meetingName === 'TBC',
      series: Series.F1
    })))

  return getFutureRaces(races)
}

const sessionMap = {
  'p1': Type.PRACTICE,
  'p2': Type.PRACTICE,
  'p3': Type.PRACTICE,
  'q': Type.QUALIFYING,
  's': Type.QUALIFYING,
  'r': Type.RACE
}

const getSessions = async (id): Promise<Session[]> => {
  const { data } = await f1Client.get<SessionsResponse>('/fom-results/timetables', { params: { meeting: id }})

  return data.timetables
    .sort((a, b) => Number(new Date(a.startTime)) - Number(new Date(b.startTime)))
    .map(session => ({
      id: `${id}-${session.session}`,
      type: sessionMap[session.session],
      name: session.description,
      startTime: `${session.startTime}${session.gmtOffset}`,
      endTime: `${session.endTime}${session.gmtOffset}`,
      unconfirmed: false
    }))
}