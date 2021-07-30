import { Race, RaceStatus } from '@/types/race'
import { RacesResponse } from './types'

const statusMap = {
  'PRE-RACE': RaceStatus.UPCOMING,
  'POST-RACE': RaceStatus.COMPLETED,
  'CURRENT': RaceStatus.ONGOING
}

export const mapResponseToData = (data: RacesResponse): Race[] => data.Races.map(race => ({
  id: race.RaceId,
  name: race.CountryName,
  sessions: race.Sessions.filter(session => session.SessionCode === 'RESULT').map(session => ({
    id: session.SessionId,
    name: session.SessionName,
    unconfirmed: session.Unconfirmed,
    startTime: session.SessionStartTime,
  })),
  provisional: race.Provisional,
  status: statusMap[race.State]
}))