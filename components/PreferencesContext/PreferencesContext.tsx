import {
  DEFAULT_FOLLOWED_SESSIONS,
  FOLLOWED_SESSIONS_KEY,
  getLocalPreferences,
  TIMEZONE_KEY,
  USE_24_HOUR_FORMAT_KEY
} from '@/utils/preferences'
import dayjs from 'dayjs'
import { useSession } from 'next-auth/react'
import { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { ActionablePreferences, FollowedSessionsPreferences } from './types'

const PreferencesContext = createContext<ActionablePreferences>(null)

export const usePreferences = () => useContext(PreferencesContext)

const PreferencesProvider = ({ children }: { children: ReactNode }) => {
  const { data, status } = useSession()
  const [followedSessions, setFollowedSessions] = useState<FollowedSessionsPreferences>(DEFAULT_FOLLOWED_SESSIONS)
  const [timezone, setTimezone] = useState(dayjs.tz.guess())
  const [use24HourFormat, setUse24HourFormat] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isLinkedToAccount, setIsLinkedToAccount] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const fetchPreferences = async () => {
    const response = await fetch(`/api/preferences/${data.user.id}`)
    const preferences = await response.json()
    if (!preferences) {
      setIsLinkedToAccount(false)
      setIsLoading(false)
      return
    }
    const { followedSessions, timezone, use24HourFormat } = preferences
    setFollowedSessions(prev => ({ ...prev, ...followedSessions }))
    setTimezone(timezone)
    setUse24HourFormat(use24HourFormat)
    setIsLinkedToAccount(true)
    setIsLoading(false)
  }

  useEffect(() => {
    if (status === 'authenticated') {
      fetchPreferences()
      return
    }

    if (status === 'unauthenticated') {
      const { followedSessions, timezone, use24HourFormat } = getLocalPreferences()
      setFollowedSessions(followedSessions)
      setTimezone(timezone)
      setUse24HourFormat(use24HourFormat)
      setIsLoading(false)
    }
  }, [status])

  const save = async (followedSessions: FollowedSessionsPreferences, timezone: string, use24HourFormat: boolean) => {
    setFollowedSessions(followedSessions)
    setTimezone(timezone)
    setUse24HourFormat(use24HourFormat)

    if (data) {
      setIsSaving(true)
      await fetch(
        `/api/preferences/${data.user.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ followedSessions, timezone, use24HourFormat })
        })
      setIsLinkedToAccount(true)
      setIsSaving(false)
    } else {
      localStorage.setItem(FOLLOWED_SESSIONS_KEY, JSON.stringify(followedSessions))
      localStorage.setItem(TIMEZONE_KEY, timezone)
      localStorage.setItem(USE_24_HOUR_FORMAT_KEY, JSON.stringify(use24HourFormat))
    }
  }

  const preferences = {
    followedSessions,
    isFollowingSessions: Object.values(followedSessions).flat().length > 0,
    timezone,
    use24HourFormat,
    save,
    isLoading,
    isLinkedToAccount,
    isSaving,
  }

  return (
    <PreferencesContext.Provider value={preferences}>
      {children}
    </PreferencesContext.Provider>
  )
}

export default PreferencesProvider