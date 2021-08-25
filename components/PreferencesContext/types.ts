import { FollowedSessions, Series } from '@/types/race'
import { Dispatch } from 'react'

export type Preferences = {
  followedSessions: {
    f1: FollowedSessions
    f2: FollowedSessions
    f3: FollowedSessions
    fe: FollowedSessions
    wseries: FollowedSessions
  },
  timezone: string
}

export type Action =
  { type: 'LOAD_FOLLOWED_SESSIONS', payload } |
  {
    type: 'SET_FOLLOWED_SESSIONS'
    payload: { series: Series, followedSessions: FollowedSessions }
  } |
  { type: 'SET_TIMEZONE', payload: string }

export type ActionablePreferences = Preferences & { dispatch: Dispatch<Action> }