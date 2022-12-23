import { Series } from '@/series/config'
import Event from '@/types/event'
import Session, { Type } from '@/types/session'
import axios from 'axios'
import { EventsResponse, SessionsResponse } from './types'

const f1Client = axios.create({ baseURL: 'https://api.formula1.com/v1', headers: { apikey: process.env.F1_KEY }})

const getEvents = async (): Promise<Event[]> => {
  const { data } = await f1Client.get<EventsResponse>('/editorial-eventlisting/events')

  return Promise.all(data.events
    .filter(race => race.type === 'race')
    .map(async race => {
      const sessions = await getSessions(race.meetingKey)
      return {
        id: race.meetingKey,
        name: race.meetingName,
        sessions,
        provisional: race.meetingName === 'TBC' || sessions.length === 0,
        series: Series.F1,
        raceDate: `${race.meetingEndDate}${race.gmtOffset}`
      }
    }))
}

export default getEvents

const sessionMap = {
  p1: Type.Practice,
  p2: Type.Practice,
  p3: Type.Practice,
  q: Type.Qualifying,
  s: Type.Qualifying,
  r: Type.Race
}

const getSessions = async (id): Promise<Session[]> => {
  const { data } = await f1Client.get<SessionsResponse>('/fom-results/timetables', { params: { meeting: id }})

  if (data.timetables.some(session => session.startTime === 'TBC' || session.endTime === 'TBC')) return []

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