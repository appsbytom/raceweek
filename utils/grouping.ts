import { FollowedSessionsPreferences } from '@/components/PreferencesContext/types'
import Week, { GroupedSession } from '@/types/week'
import dayjs from 'dayjs'

export const groupIntoWeeks = (sessions: GroupedSession[], followedSessions: FollowedSessionsPreferences, timezone: string): Week[] => {
  const weeks = sessions
    .filter(session => followedSessions[session.series].includes(session.type) && dayjs(session.endTime).isSameOrAfter(dayjs()))
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