import dayjs from 'dayjs'
import { createContext, ReactNode, useContext, useEffect, useReducer } from 'react'
import { initialState, reducer } from './reducer'
import { ActionablePreferences } from './types'

const PreferencesContext = createContext<ActionablePreferences>(null)

export const usePreferences = () => useContext(PreferencesContext)

const FOLLOWED_SESSIONS_KEY = 'followedSessions'
const TIMEZONE_KEY = 'timezone'
const PreferencesProvider = ({ children }: { children: ReactNode }) => {
  const [{ followedSessions, timezone }, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    const storedFollowedSessions = localStorage.getItem(FOLLOWED_SESSIONS_KEY)
    if (storedFollowedSessions) dispatch({ type: 'LOAD_FOLLOWED_SESSIONS', payload: JSON.parse(storedFollowedSessions) })

    const storedTimezone = localStorage.getItem(TIMEZONE_KEY)
    dispatch({ type: 'SET_TIMEZONE', payload: storedTimezone || dayjs.tz.guess() })
  }, [])

  useEffect(() => localStorage.setItem(FOLLOWED_SESSIONS_KEY, JSON.stringify(followedSessions)), [followedSessions])

  useEffect(() => localStorage.setItem(TIMEZONE_KEY, timezone), [timezone])

  return (
    <PreferencesContext.Provider value={{ followedSessions, timezone, dispatch }}>
      {children}
    </PreferencesContext.Provider>
  )
}

export default PreferencesProvider