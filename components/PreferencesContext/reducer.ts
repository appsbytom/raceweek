import { Reducer } from 'react'
import { Action, Preferences } from './types'

export const initialState: Preferences = {
  followedSessions: {
    f1: [],
    f2: [],
    f3: [],
    fe: [],
    wseries: []
  }
}
export const reducer: Reducer<Preferences, Action> = (state: Preferences, action: Action) => {
  switch (action.type) {
    case 'LOAD_FOLLOWED_SESSIONS':
      return { ...state, followedSessions: action.payload }
    case 'SET_FOLLOWED_SESSIONS':
      return { ...state, followedSessions: { ...state.followedSessions, [action.payload.series]: action.payload.followedSessions }}
    default:
      return state
  }
}