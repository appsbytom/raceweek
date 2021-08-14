import PreferencesProvider from '@/components/PreferencesContext/PreferencesContext'
import dayjs from 'dayjs'
import isoWeek from 'dayjs/plugin/isoWeek'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import { AppProps } from 'next/app'

import 'tailwindcss/tailwind.css'

dayjs.extend(isoWeek)
dayjs.extend(isSameOrAfter)
dayjs.extend(timezone)
dayjs.extend(utc)

const MyApp = ({ Component, pageProps }: AppProps) => (
  <PreferencesProvider>
    <Component {...pageProps} />
  </PreferencesProvider>
)

export default MyApp