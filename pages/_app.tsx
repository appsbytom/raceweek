import Nav from '@/components/Nav'
import PreferencesProvider from '@/components/PreferencesContext/PreferencesContext'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import dayjs from 'dayjs'
import isoWeek from 'dayjs/plugin/isoWeek'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import { SessionProvider } from 'next-auth/react'
import { AppProps } from 'next/app'
import { Inter } from 'next/font/google'
import Head from 'next/head'

import '../styles.css'

dayjs.extend(isoWeek)
dayjs.extend(isSameOrAfter)
dayjs.extend(timezone)
dayjs.extend(utc)

const inter = Inter({
  subsets: ['latin'],
  display: 'swap'
})

const MyApp = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => (
  <div className={inter.className}>
    <Head>
      <title>raceweek</title>
      <meta name="description" content="Keep track of all your favourite racing series, like F1, F2 and Formula E, to make sure you never miss any of the on-track action." />
    </Head>
    <SessionProvider session={session}>
      <PreferencesProvider>
        <Nav />
        <div className="max-w-2xl w-full mx-auto py-3">
          <Component {...pageProps} />
        </div>
      </PreferencesProvider>
    </SessionProvider>
    <Analytics />
    <SpeedInsights />
  </div>
)

export default MyApp