import axios from 'axios'
import { Race, EventsResponse, Session, SessionsResponse, SessionType, EventType } from './types'

const f1Client = axios.create({ baseURL: 'https://api.formula1.com/v1', headers: { apikey: process.env.F1_KEY }})

export const getRaces = async (): Promise<Race[]> => {
  const { data } = await f1Client.get<EventsResponse>('/editorial-eventlisting/events')

  return Promise.all(data.events
    .filter(race => race.type === EventType.RACE)
    .map(async race => ({
      meetingKey: race.meetingKey,
      meetingName: race.meetingName,
      sessions: await getSessions(race.meetingKey),
      status: race.status
    })))
}

const getSessions = async (id): Promise<Session[]> => {
  const { data } = await f1Client.get<SessionsResponse>('/fom-results/timetables', { params: { meeting: id }})

  return data.timetables
    .filter(session => session.session === SessionType.QUALIFYING || session.session === SessionType.SPRINT_QUALIFYING || session.session === SessionType.RACE)
    .map(session => ({
      type: session.session,
      description: session.description,
      startTime: `${session.startTime}${session.gmtOffset}`,
    }))
}