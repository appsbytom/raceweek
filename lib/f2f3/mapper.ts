import { Race, Series, Type } from '@/types/race'
import { getFutureRaces } from '@/utils/races'
import { RacesResponse } from './types'

const sessionMap = {
  'PRACTICE': Type.PRACTICE,
  'QUALIFYING': Type.QUALIFYING,
  'RESULT': Type.RACE
}

export const mapResponseToData = (data: RacesResponse, series: Series): Race[] => {
  const races = data.Races.map(race => ({
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

  return getFutureRaces(races)
}