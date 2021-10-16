import { FollowedSessions } from '@/types/session'

export type FollowedSessionsPreferences = {
  f1: FollowedSessions
  f2: FollowedSessions
  f3: FollowedSessions
  fe: FollowedSessions
  wseries: FollowedSessions
}

export type Preferences = {
  followedSessions: FollowedSessionsPreferences,
  timezone: string
}

export type ActionablePreferences = Preferences & { save: (followedSessions: FollowedSessionsPreferences, timezone: string) => void }