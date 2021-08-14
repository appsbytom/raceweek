import { Reducer } from 'react'
import { Action, Preferences } from './types'

export const initialState: Preferences = {
  followedSessions: {
    f1: ['q', 's', 'r'],
    f2: ['RESULT'],
    f3: ['RESULT'],
    fe: ['r'],
    wseries: ['r']
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