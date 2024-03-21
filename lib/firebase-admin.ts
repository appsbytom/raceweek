import { applicationDefault, getApps, initializeApp } from 'firebase-admin/app'
import { getMessaging } from 'firebase-admin/messaging'

if (!getApps().length) initializeApp({ credential: applicationDefault() })

export const messaging = getMessaging()

