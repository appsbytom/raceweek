import { FollowedSessions, Race } from '@/types/race'
import dayjs from 'dayjs'

export const getFutureRaces = (races: Race[]) => races
  .filter(race => dayjs(race.sessions[race.sessions.length - 1].endTime).isSameOrAfter(dayjs()) || race.provisional)

export const getFutureRacesWithFollowedSessions = (races: Race[], followedSessions: FollowedSessions) => getFutureRaces(races)
  .map(race => ({ ...race, sessions: race.sessions.filter(session => followedSessions.length > 0 ? followedSessions.includes(session.type) : true) }))