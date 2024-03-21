import { initializeApp, getApps } from 'firebase/app'
import { getMessaging, getToken } from 'firebase/messaging'

// Exposed in SW anyway
if (!getApps().length) initializeApp({
  apiKey: "AIzaSyCPpU4W39uVoREf9y33W_Lj3DUaWUTp59U",
  authDomain: "raceweek-485e9.firebaseapp.com",
  projectId: "raceweek-485e9",
  storageBucket: "raceweek-485e9.appspot.com",
  messagingSenderId: "238652906827",
  appId: "1:238652906827:web:60c7d8c2d4ed0c39231cce"
});

export const getFCMToken = async () => await getToken(getMessaging(), { vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID })