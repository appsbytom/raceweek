import { FollowedSessionsPreferences } from '@/components/PreferencesContext/types'
import Event from '@/types/event'
import { Type } from '@/types/session'
import Week, { GroupedSession } from '@/types/week'
import dayjs from 'dayjs'

type Weeks = Map<string, Map<string, { sessions: GroupedSession[], provisionalEvents: Event[] }>>

const DATE_FORMAT = 'YYYY-MM-DD'

const getDay = (weeks: Weeks, date: dayjs.Dayjs) => {
  const weekKey = `${date.startOf('isoWeek').format(DATE_FORMAT)}_${date.isoWeek()}`
  const dayKey = date.format(DATE_FORMAT)

  if (!weeks.has(weekKey)) {
    weeks.set(weekKey, new Map())
  }
  if (!weeks.get(weekKey).has(dayKey)) {
    weeks.get(weekKey).set(dayKey, { sessions: [], provisionalEvents: [] })
  }

  return weeks.get(weekKey).get(dayKey)
}

export const getWeeks = (sessions: GroupedSession[], provisionalEvents: Event[], followedSessions: FollowedSessionsPreferences, timezone: string): Week[] => {
  const weeks: Weeks = new Map()

  for (const session of sessions) {
    const followedSeries = followedSessions[session.series]
    if ((followedSeries.includes(session.type) || followedSeries.length > 0 && session.type === Type.NOT_CONFIGURED) && dayjs(session.endTime).isSameOrAfter(dayjs())) {
      const { sessions } = getDay(weeks, dayjs(session.startTime).tz(timezone))

      sessions.push(session)
    }
  }

  for (const event of provisionalEvents) {
    if (followedSessions[event.series].length > 0) {
      const { provisionalEvents } = getDay(weeks, dayjs(event.raceDate).utc())

      provisionalEvents.push(event)
    }
  }

  return Array.from(weeks, ([key, days]) => {
    const [date, weekNumber] = key.split('_')
    return {
      date,
      weekNumber: Number(weekNumber),
      days: Array.from(days, ([date, { sessions, provisionalEvents }]) => ({
        date,
        sessions,
        provisionalEvents
      })).sort((a, b) => Number(new Date(a.date)) - Number(new Date(b.date))),
    };
  }).sort((a, b) => Number(new Date(a.date)) - Number(new Date(b.date)))
}