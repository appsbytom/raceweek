import { Race } from '@/types/race'
import { getFutureRaces } from '@/utils/races'
import data from '../_data/wseries'

export const getRaces = (): Race[] => getFutureRaces(data)