import { Race } from '@/types/race'
import data from '../_data/wseries'

export const getRaces = (): Race[] => {
  return data.map(race => ({
    ...race,
    sessions: race.sessions.filter(session => session.id === 'r' )
  }))
}