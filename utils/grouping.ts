import { FollowedSessionsPreferences } from '@/components/PreferencesContext/types'
import Event from '@/types/event'
import Week, { GroupedSession } from '@/types/week'
import dayjs from 'dayjs'

type Weeks = Map<number, Map<string, { sessions: GroupedSession[], provisionalEvents: Event[] }>>

const getDay = (weeks: Weeks, date: dayjs.Dayjs) => {
  const weekNumber = date.isoWeek()
  const dayKey = date.format('YYYY/MM/DD')

  if (!weeks.has(weekNumber)) {
    weeks.set(weekNumber, new Map())
  }
  if (!weeks.get(weekNumber).has(dayKey)) {
    weeks.get(weekNumber).set(dayKey, { sessions: [], provisionalEvents: [] })
  }

  return weeks.get(weekNumber).get(dayKey)
}

export const getWeeks = (sessions: GroupedSession[], provisionalEvents: Event[], followedSessions: FollowedSessionsPreferences, timezone: string): Week[] => {
  const weeks: Weeks = new Map()

  for (const session of sessions.filter(session => followedSessions[session.series].includes(session.type) && dayjs(session.endTime).isSameOrAfter(dayjs()))) {
    const { sessions } = getDay(weeks, dayjs(session.startTime).tz(timezone))

    sessions.push(session)
  }

  for (const event of provisionalEvents.filter(event => followedSessions[event.series].length > 0)) {
    const { provisionalEvents } = getDay(weeks, dayjs(event.raceDate).utc())

    provisionalEvents.push(event)
  }

  return Array.from(weeks, ([number, days]) => ({
    number,
    days: Array.from(days, ([date, { sessions, provisionalEvents }]) => ({
      date,
      sessions,
      provisionalEvents
    })),
  })).sort((a, b) => a.number - b.number)
}