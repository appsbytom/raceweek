import dayjs from 'dayjs'
import { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { ActionablePreferences, FollowedSessionsPreferences } from './types'

const PreferencesContext = createContext<ActionablePreferences>(null)

export const usePreferences = () => useContext(PreferencesContext)

const FOLLOWED_SESSIONS_KEY = 'followedSessions'
const TIMEZONE_KEY = 'timezone'
const USE_24_HOUR_FORMAT_KEY = 'use24HourFormat'
const PreferencesProvider = ({ children }: { children: ReactNode }) => {
  const [followedSessions, setFollowedSessions] = useState<FollowedSessionsPreferences>({
    f1: [],
    f2: [],
    f3: [],
    fe: [],
    wseries: []
  })
  const [timezone, setTimezone] = useState('')
  const [use24HourFormat, setUse24HourFormat] = useState(false)

  useEffect(() => {
    const storedFollowedSessions = localStorage.getItem(FOLLOWED_SESSIONS_KEY)
    if (storedFollowedSessions) setFollowedSessions(JSON.parse(storedFollowedSessions))

    const storedTimezone = localStorage.getItem(TIMEZONE_KEY)
    setTimezone(storedTimezone || dayjs.tz.guess())

    const storedUse24HourFormat = localStorage.getItem(USE_24_HOUR_FORMAT_KEY)
    if (storedUse24HourFormat) setUse24HourFormat(JSON.parse(storedUse24HourFormat))
  }, [])

  const save = (followedSessions: FollowedSessionsPreferences, timezone: string, use24HourFormat: boolean) => {
    setFollowedSessions(followedSessions)
    localStorage.setItem(FOLLOWED_SESSIONS_KEY, JSON.stringify(followedSessions))
    setTimezone(timezone)
    localStorage.setItem(TIMEZONE_KEY, timezone)
    setUse24HourFormat(use24HourFormat)
    localStorage.setItem(USE_24_HOUR_FORMAT_KEY, JSON.stringify(use24HourFormat))
  }

  return (
    <PreferencesContext.Provider value={{ followedSessions, timezone, use24HourFormat, save }}>
      {children}
    </PreferencesContext.Provider>
  )
}

export default PreferencesProvider