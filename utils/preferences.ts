import { FollowedSessionsPreferences } from '@/components/PreferencesContext/types'
import { Series } from '@/series/config'
import dayjs from 'dayjs'

export const FOLLOWED_SESSIONS_KEY = 'followedSessions'
export const DEFAULT_FOLLOWED_SESSIONS: FollowedSessionsPreferences = Object.values(Series).reduce((acc, value) => {
  acc[value] = []
  return acc
}, {}) as FollowedSessionsPreferences
export const TIMEZONE_KEY = 'timezone'
export const USE_24_HOUR_FORMAT_KEY = 'use24HourFormat'

export const getLocalPreferences = () => {
  const storedFollowedSessions = localStorage.getItem(FOLLOWED_SESSIONS_KEY)
  const storedTimezone = localStorage.getItem(TIMEZONE_KEY)
  const storedUse24HourFormat = localStorage.getItem(USE_24_HOUR_FORMAT_KEY)

  return {
    followedSessions: storedFollowedSessions ? { ...DEFAULT_FOLLOWED_SESSIONS, ...JSON.parse(storedFollowedSessions) } : DEFAULT_FOLLOWED_SESSIONS,
    timezone: storedTimezone || dayjs.tz.guess(),
    use24HourFormat: storedUse24HourFormat ? JSON.parse(storedUse24HourFormat) : false
  }
}