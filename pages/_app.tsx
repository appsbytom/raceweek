import PreferencesProvider from '@/components/PreferencesContext/PreferencesContext'
import dayjs from 'dayjs'
import isoWeek from 'dayjs/plugin/isoWeek'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import { SessionProvider } from 'next-auth/react'
import { AppProps } from 'next/app'

import 'tailwindcss/tailwind.css'

dayjs.extend(isoWeek)
dayjs.extend(isSameOrAfter)
dayjs.extend(timezone)
dayjs.extend(utc)

const MyApp = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => (
  <SessionProvider session={session}>
    <PreferencesProvider>
      <div className="max-w-2xl w-full mx-auto px-4 py-6">
        <Component {...pageProps} />
      </div>
    </PreferencesProvider>
  </SessionProvider>
)

export default MyApp