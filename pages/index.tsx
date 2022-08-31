import MigratePreferences from '@/components/MigratePreferences'
import Preferences from '@/components/Preferences'
import { usePreferences } from '@/components/PreferencesContext/PreferencesContext'
import Spinner from '@/components/Spinner'
import WeekList from '@/components/WeekList'
import { getEvents as getF1Events } from '@/lib/f1/f1'
import { getEvents as getF2Events } from '@/lib/f2f3/f2'
import { getEvents as getF3Events } from '@/lib/f2f3/f3'
import { getEvents as getFEEvents } from '@/lib/fe/fe'
import { getEvents as getWSeriesEvents } from '@/lib/wseries'
import Event from '@/types/event'
import { GroupedSession } from '@/types/week'
import { getWeeks } from '@/utils/grouping'
import partition from '@/utils/partition'
import dayjs from 'dayjs'
import { GetStaticProps } from 'next'
import { useSession } from 'next-auth/react'

type Props = {
  sessions: GroupedSession[]
  provisionalEvents: Event[]
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const events = (await Promise.all([getF1Events(), getF2Events(), getF3Events(), getFEEvents(), getWSeriesEvents()])).flat()
  const [provisionalEvents, confirmedEvents] = partition(events, event => event.provisional)

  const sessions = confirmedEvents
    .filter(event => dayjs(event.sessions[event.sessions.length - 1].endTime).isSameOrAfter(dayjs()))
    .flatMap(event => event.sessions.map(session => ({ ...session, series: event.series, eventName: event.name })))
    .sort((a, b) => Number(new Date(a.startTime)) - Number(new Date(b.startTime)))

  return {
    props: {
      sessions,
      provisionalEvents: provisionalEvents.sort((a, b) => Number(new Date(a.raceDate)) - Number(new Date(b.raceDate)))
    }
  }
}

const Home = ({ sessions, provisionalEvents }: Props) => {
  const { status } = useSession()
  const { followedSessions, isFollowingSessions, timezone, isLoading } = usePreferences()

  const weeks = getWeeks(sessions, provisionalEvents, followedSessions, timezone)

  if (status === 'loading' || (status === 'authenticated' && isLoading)) {
    return (
      <div className="flex items-center justify-center">
        <Spinner className="h-8 w-8 border-black" />
      </div>
    )
  }

  return (
    <>
      <MigratePreferences />
      <Preferences />
      {weeks.length > 0 ? <WeekList weeks={weeks} /> : isFollowingSessions && (
        <div className="text-center">
          <h1 className="font-semibold">Season finished</h1>
          <h2 className="text-gray-700">All the series' you follow have finished, check back next year</h2>
        </div>
      )}
    </>
  )
}

export default Home