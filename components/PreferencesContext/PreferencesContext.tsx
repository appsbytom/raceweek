import dayjs from 'dayjs'
import { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { ActionablePreferences, FollowedSessionsPreferences } from './types'

const PreferencesContext = createContext<ActionablePreferences>(null)

export const usePreferences = () => useContext(PreferencesContext)

const FOLLOWED_SESSIONS_KEY = 'followedSessions'
const TIMEZONE_KEY = 'timezone'
const PreferencesProvider = ({ children }: { children: ReactNode }) => {
  const [followedSessions, setFollowedSessions] = useState<FollowedSessionsPreferences>({
    f1: [],
    f2: [],
    f3: [],
    fe: [],
    wseries: []
  })
  const [timezone, setTimezone] = useState('')

  useEffect(() => {
    const storedFollowedSessions = localStorage.getItem(FOLLOWED_SESSIONS_KEY)
    if (storedFollowedSessions) setFollowedSessions(JSON.parse(storedFollowedSessions))

    const storedTimezone = localStorage.getItem(TIMEZONE_KEY)
    setTimezone(storedTimezone || dayjs.tz.guess())
  }, [])

  const save = (followedSessions: FollowedSessionsPreferences, timezone: string) => {
    setFollowedSessions(followedSessions)
    localStorage.setItem(FOLLOWED_SESSIONS_KEY, JSON.stringify(followedSessions))
    setTimezone(timezone)
    localStorage.setItem(TIMEZONE_KEY, timezone)
  }

  return (
    <PreferencesContext.Provider value={{ followedSessions, timezone, save }}>
      {children}
    </PreferencesContext.Provider>
  )
}

export default PreferencesProvider