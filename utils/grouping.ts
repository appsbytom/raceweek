import { FollowedSessionsPreferences } from '@/components/PreferencesContext/types'
import Event from '@/types/event'
import { FollowedSessions } from '@/types/session'
import Week, { GroupedSession } from '@/types/week'
import dayjs from 'dayjs'
import { getFutureEvents } from './events'

const getFollowedSeriesEvents = (events: Event[], followedSessions: FollowedSessions) => followedSessions.length > 0
  ? getFutureEvents(events).map(event => ({ ...event, sessions: event.sessions.filter(session => followedSessions.includes(session.type)) }))
  : []

export const groupIntoWeeks = (f1Events: Event[], f2Events: Event[], f3Events: Event[], feEvents: Event[], wseriesEvents: Event[], followedSessions: FollowedSessionsPreferences, timezone: string): Week[] => {
  const weeks = [
    ...getFollowedSeriesEvents(f1Events, followedSessions.f1),
    ...getFollowedSeriesEvents(f2Events, followedSessions.f2),
    ...getFollowedSeriesEvents(f3Events, followedSessions.f3),
    ...getFollowedSeriesEvents(feEvents, followedSessions.fe),
    ...getFollowedSeriesEvents(wseriesEvents, followedSessions.wseries)
  ]
    .flatMap(event => event.sessions.map(session => ({ ...session, series: event.series, eventName: event.name })))
    .filter(session => dayjs(session.endTime).isSameOrAfter(dayjs()))
    .sort((a, b) => Number(new Date(a.startTime)) - Number(new Date(b.startTime)))
    .reduce((acc, session) => {
      const date = dayjs(session.startTime).tz(timezone)
      const weekNumber = date.isoWeek()
      const dateKey = date.format('YYYY/MM/DD')

      if (!acc.has(weekNumber)) {
        acc.set(weekNumber, new Map())
      }
      if (!acc.get(weekNumber).has(dateKey)) {
        acc.get(weekNumber).set(dateKey, [])
      }
      acc.get(weekNumber).get(dateKey).push(session)
      return acc
    }, new Map<number, Map<string, GroupedSession[]>>())

  return Array.from(weeks, ([number, days]) => ({
    number,
    days: Array.from(days, ([date, sessions]) => ({ date, sessions }))
  }))
}