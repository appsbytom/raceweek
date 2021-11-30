import Event, { Series } from '@/types/event'
import { Type } from '@/types/session'
import { RacesResponse } from './types'

const sessionMap = {
  'PRACTICE': Type.Practice,
  'QUALIFYING': Type.Qualifying,
  'RESULT': Type.Race
}

export const mapResponseToData = (data: RacesResponse, series: Series): Event[] => data.Races.map(race => ({
  id: race.RaceId,
  name: race.CountryName,
  sessions: race.Sessions.map(session => ({
    id: session.SessionId,
    name: session.SessionName,
    type: sessionMap[session.SessionCode],
    unconfirmed: session.Unconfirmed,
    startTime: session.SessionStartTime,
    endTime: session.SessionEndTime
  })),
  provisional: race.Provisional,
  series
}))