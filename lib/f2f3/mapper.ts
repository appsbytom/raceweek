import { Race, Series } from '@/types/race'
import { RacesResponse } from './types'

export const mapResponseToData = (data: RacesResponse, series: Series): Race[] => data.Races.map(race => ({
  id: race.RaceId,
  name: race.CountryName,
  sessions: race.Sessions.filter(session => session.SessionCode === 'RESULT').map(session => ({
    id: session.SessionId,
    name: session.SessionName,
    unconfirmed: session.Unconfirmed,
    startTime: session.SessionStartTime,
    endTime: session.SessionEndTime
  })),
  provisional: race.Provisional,
  series
}))