import { FollowedSessions } from '@/types/race'
import { createContext, useContext } from 'react'

type Preferences = {
  followedSessions: {
    f1: FollowedSessions
    f2: FollowedSessions
    f3: FollowedSessions
    fe: FollowedSessions
    wseries: FollowedSessions
  }
}

const PreferencesContext = createContext<Preferences>(null)

export const usePreferences = () => useContext(PreferencesContext)

const PreferencesProvider = ({ children }) => {
  const followedSessions = {
    f1: ['q', 's', 'r'],
    f2: ['RESULT'],
    f3: ['RESULT'],
    fe: ['r'],
    wseries: ['r']
  }

  return (
    <PreferencesContext.Provider value={{ followedSessions }}>
      {children}
    </PreferencesContext.Provider>
  )
}

export default PreferencesProvider