import { Race } from '@/types/race'
import dayjs from 'dayjs'

export const getFutureRaces = (races: Race[]) => races.filter(race => dayjs(race.sessions[race.sessions.length - 1].endTime).isSameOrAfter(dayjs()) || race.provisional)