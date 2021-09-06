import { FollowedSessions, Event } from '@/types/event'
import dayjs from 'dayjs'

export const getFutureEvents = (events: Event[]) => events
  .filter(event => dayjs(event.sessions[event.sessions.length - 1].endTime).isSameOrAfter(dayjs()) || event.provisional)

export const getFutureEventsWithFollowedSessions = (events: Event[], followedSessions: FollowedSessions) => getFutureEvents(events)
  .map(event => ({ ...event, sessions: event.sessions.filter(session => followedSessions.length > 0 ? followedSessions.includes(session.type) : true) }))