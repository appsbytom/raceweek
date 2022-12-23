import { SeriesMap } from '@/series/config';
import { FollowedSessions } from '@/types/session'

export type FollowedSessionsPreferences = SeriesMap<FollowedSessions>

type Preferences = {
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