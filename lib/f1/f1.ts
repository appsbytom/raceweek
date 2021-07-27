import axios from 'axios'
import { Race, RacesResponse, Session, SessionsResponse, SessionType, Type } from './types'

const f1Client = axios.create({ baseURL: 'https://api.formula1.com/v1/fom-results', headers: { apikey: process.env.F1_KEY }})
const RACES_ENDPOINT = '/raceresults'
const SESSIONS_ENDPOINT = '/timetables'

export const getRaces = async (): Promise<Race[]> => {
  const { data } = await f1Client.get<RacesResponse>(RACES_ENDPOINT)

  return Promise.all(data.raceresults
    .filter(race => race.type === Type.RACE)
    .sort((a, b) => Number(new Date(a.meetingStartDate)) - Number(new Date(b.meetingStartDate)))
    .map(async race => ({
      meetingKey: race.meetingKey,
      meetingName: race.meetingName,
      sessions: await getSessions(race.meetingKey)
    })))
}

const getSessions = async (id): Promise<Session[]> => {
  const { data } = await f1Client.get<SessionsResponse>(SESSIONS_ENDPOINT, { params: { meeting: id }})

  return data.timetables
    .filter(session => session.session === SessionType.QUALIFYING || session.session === SessionType.SPRINT_QUALIFYING || session.session === SessionType.RACE)
    .map(session => ({
      state: session.state,
      type: session.session,
      description: session.description,
      startTime: `${session.startTime}${session.gmtOffset}`,
    }))
}