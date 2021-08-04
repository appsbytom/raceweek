import { Race } from '@/types/race'
import { RacesResponse } from './types'

export const mapResponseToData = (data: RacesResponse): Race[] => data.Races.map(race => ({
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
}))