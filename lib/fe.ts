import { Race } from '@/types/race'
import { getFutureRaces } from '@/utils/races'
import data from '../_data/fe'

export const getRaces = (): Race[] => getFutureRaces(data)