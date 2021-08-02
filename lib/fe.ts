import { Race } from '@/types/race'
import data from '../_data/fe'

export const getRaces = (): Race[] => {
  return data.map(race => ({
    ...race,
    sessions: race.sessions.filter(session => session.id === 'r')
  }))
}