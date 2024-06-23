import Message from '@/components/Message'
import { usePreferences } from '@/components/PreferencesContext/PreferencesContext'
import SkeletonWeekList from '@/components/SkeletonWeekList'
import UpNext from '@/components/UpNext'
import WeekList from '@/components/WeekList'
import { getAllEvents } from '@/series/fetcher-config'
import Event from '@/types/event'
import { Type } from '@/types/session'
import { GroupedSession } from '@/types/week'
import { getWeeks } from '@/utils/grouping'
import partition from '@/utils/partition'
import dayjs from 'dayjs'
import { GetStaticProps } from 'next'
import { useSession } from 'next-auth/react'
import Link from 'next/link'

type Props = {
  sessions: GroupedSession[]
  provisionalEvents: Event[]
  skeletonActivityCounts: number[]
}

const getRandomNumber = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min)

export const getStaticProps: GetStaticProps<Props> = async () => {
  const events = await getAllEvents()
  const [provisionalEvents, confirmedEvents] = partition(events, event => event.provisional)

  const sessions = confirmedEvents
    .filter(event => dayjs(event.sessions[event.sessions.length - 1].endTime).isSameOrAfter(dayjs()))
    .flatMap(event => event.sessions.map(session => ({ ...session, type: session.type || Type.NOT_CONFIGURED, series: event.series, eventName: event.name })))
    .sort((a, b) => Number(new Date(a.startTime)) - Number(new Date(b.startTime)))

  return {
    props: {
      sessions,
      provisionalEvents: provisionalEvents
        .filter(event => dayjs(event.raceDate).isSameOrAfter(dayjs()))
        .sort((a, b) => Number(new Date(a.raceDate)) - Number(new Date(b.raceDate))),
      skeletonActivityCounts: Array.from({ length: getRandomNumber(5, 10) }, () => getRandomNumber(1, 3)),
    }
  }
}

const Home = ({ sessions, provisionalEvents, skeletonActivityCounts }: Props) => {
  const { status } = useSession()
  const { followedSessions, isFollowingSessions, timezone, isLoading } = usePreferences()

  if (status === 'loading' || isLoading) {
    return <SkeletonWeekList activityCounts={skeletonActivityCounts} />
  }

  if (!isFollowingSessions) {
    return (
      <div className="px-3">
        <Message title="No series' followed" description="Get started by selecting the series’ you are interested in and setup your account">
          <Link href="/preferences" className="inline-block w-full shrink-0 px-4 py-2 border border-gray-300 rounded-md text-sm font-semibold mt-3 hover:bg-gray-50 sm:w-auto">
            Set your preferences
          </Link>
        </Message>
      </div>
    )
  }

  const weeks = getWeeks(sessions, provisionalEvents, followedSessions, timezone)

  if (weeks.length <= 0) {
    return (
      <div className="px-3">
        <Message title="Season finished" description="All the series' you follow have finished, check back next year" />
      </div>
    )
  }

  return (
    <>
      <UpNext week={weeks[0]} />
      <WeekList weeks={weeks.slice(1)} />
    </>
  )
}

export default Home