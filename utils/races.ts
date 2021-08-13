import { FollowedSessions, Race } from '@/types/race'
import dayjs from 'dayjs'

export const getFutureRaces = (races: Race[], followedSessions: FollowedSessions) => races
  .filter(race => dayjs(race.sessions[race.sessions.length - 1].endTime).isSameOrAfter(dayjs()) || race.provisional)
  .map(race => ({ ...race, sessions: race.sessions.filter(session => followedSessions.length > 0 ? followedSessions.includes(session.type) : true) }))