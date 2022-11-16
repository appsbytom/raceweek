import Message from '@/components/Message';
import { usePreferences } from '@/components/PreferencesContext/PreferencesContext'
import SkeletonWeekList from '@/components/SkeletonWeekList';
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
import Link from 'next/link'

type Props = {
  sessions: GroupedSession[]
  provisionalEvents: Event[]
  skeletonActivityCounts: number[]
}

const getRandomNumber = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min)

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
      provisionalEvents: provisionalEvents.sort((a, b) => Number(new Date(a.raceDate)) - Number(new Date(b.raceDate))),
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
      <Message title="No series' followed" description="Get started by selecting the series’ you are interested in and setup your account">
        <Link href="/preferences">
          <a className="inline-block w-full shrink-0 px-4 py-2 border border-gray-300 rounded-md font-medium mt-3 hover:bg-gray-50 sm:w-auto">
            Set your preferences
          </a>
        </Link>
      </Message>
    )
  }

  const weeks = getWeeks(sessions, provisionalEvents, followedSessions, timezone)

  if (weeks.length <= 0) {
    return <Message title="Season finished" description="All the series' you follow have finished, check back next year" />
  }

  return <WeekList weeks={weeks} />
}

export default Home