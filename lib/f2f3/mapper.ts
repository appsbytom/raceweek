import { RacesResponse, SessionCode, Race } from './types'

export const mapResponseToData = (data: RacesResponse): Race[] => data.Races.map(race => ({
  id: race.RaceId,
  name: race.CountryName,
  sessions: race.Sessions.filter(session => session.SessionCode === SessionCode.RACE).map(session => ({
    id: session.SessionId,
    name: session.SessionName,
    unconfirmed: session.Unconfirmed,
    startTime: session.SessionStartTime,
  })),
  state: race.State,
}))