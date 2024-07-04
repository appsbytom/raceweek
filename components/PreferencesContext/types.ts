import { SeriesMap } from '@/series/config'
import { FollowedSessions } from '@/types/session'
import { NotificationStatus } from '@/utils/notifications'
import { Dispatch, SetStateAction } from 'react'

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
  notificationPermission: string
  setNotificationPermission: Dispatch<SetStateAction<NotificationStatus>>
}