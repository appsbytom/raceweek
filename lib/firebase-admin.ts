import { getApps, initializeApp, cert } from 'firebase-admin/app'
import { getMessaging } from 'firebase-admin/messaging'

if (!getApps().length) initializeApp({ credential: cert(JSON.parse(process.env.FIREBASE_CREDENTIALS)) })

export const messaging = getMessaging()

