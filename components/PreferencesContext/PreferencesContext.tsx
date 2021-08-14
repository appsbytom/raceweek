import { createContext, ReactNode, useContext, useEffect, useReducer } from 'react'
import { initialState, reducer } from './reducer'
import { ActionablePreferences } from './types'

const PreferencesContext = createContext<ActionablePreferences>(null)

export const usePreferences = () => useContext(PreferencesContext)

const FOLLOWED_SESSIONS_KEY = 'followedSessions'
const PreferencesProvider = ({ children }: { children: ReactNode }) => {
  const [{ followedSessions }, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    const storedFollowedSessions = localStorage.getItem(FOLLOWED_SESSIONS_KEY)
    if (storedFollowedSessions) dispatch({ type: 'LOAD_FOLLOWED_SESSIONS', payload: JSON.parse(storedFollowedSessions) })
  }, [])

  useEffect(() => {
    localStorage.setItem(FOLLOWED_SESSIONS_KEY, JSON.stringify(followedSessions))
  }, [followedSessions])

  return (
    <PreferencesContext.Provider value={{ followedSessions, dispatch }}>
      {children}
    </PreferencesContext.Provider>
  )
}

export default PreferencesProvider