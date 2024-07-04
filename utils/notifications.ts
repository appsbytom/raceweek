import { FollowedSessionsPreferences } from '@/components/PreferencesContext/types'
import { getFCMToken } from '@/lib/firebase'

export type NotificationStatus = 'unsupported' | NotificationPermission
export const NOTIFICATION_KEY = 'notifications'

export const subscribe = async (followedSessions?: FollowedSessionsPreferences) => {
  const topics = followedSessions ? Object.entries(followedSessions).flatMap(([key, value]) => value.flatMap(v => `${key}-${v}`)) : []
  const token = await getFCMToken()
  await fetch('/api/subscribe', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      token,
      topics
    })
  })
}