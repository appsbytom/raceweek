import { FollowedSessions } from '@/types/session'

export type FollowedSessionsPreferences = {
  f1: FollowedSessions
  f2: FollowedSessions
  f3: FollowedSessions
  fe: FollowedSessions
  wseries: FollowedSessions
}

export type Preferences = {
  followedSessions: FollowedSessionsPreferences
  isFollowingSessions: boolean
  timezone: string
  use24HourFormat: boolean
}

export type ActionablePreferences = Preferences & {
  save: (followedSessions: FollowedSessionsPreferences, timezone: string, use24HourFormat: boolean) => Promise<void>
  isLoading: boolean
  isLinkedToAccount: boolean
  isSaving: boolean
}