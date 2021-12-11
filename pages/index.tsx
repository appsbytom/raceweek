import Preferences from '@/components/Preferences'
import { usePreferences } from '@/components/PreferencesContext/PreferencesContext'
import WeekList from '@/components/WeekList'
import useMounted from '@/hooks/useMounted'
import { getEvents as getF1Events } from '@/lib/f1/f1'
import { getEvents as getF2Events } from '@/lib/f2f3/f2'
import { getEvents as getF3Events } from '@/lib/f2f3/f3'
import { getEvents as getFEEvents } from '@/lib/fe'
import { getEvents as getWSeriesEvents } from '@/lib/wseries'
import { GroupedSession } from '@/types/week'
import { groupIntoWeeks } from '@/utils/grouping'
import dayjs from 'dayjs'
import { GetStaticProps } from 'next'

type Props = {
  sessions: GroupedSession[]
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const events = (await Promise.all([getF1Events(), getF2Events(), getF3Events(), getFEEvents(), getWSeriesEvents()])).flat()
  const sessions = events
    .filter(event => !event.provisional && dayjs(event.sessions[event.sessions.length - 1].endTime).isSameOrAfter(dayjs()))
    .flatMap(event => event.sessions.map(session => ({ ...session, series: event.series, eventName: event.name })))
    .sort((a, b) => Number(new Date(a.startTime)) - Number(new Date(b.startTime)))

  return {
    props: { sessions }
  }
}

const Home = ({ sessions }: Props) => {
  const isMounted = useMounted()
  const { followedSessions, isFollowingSessions, timezone } = usePreferences()

  const weeks = groupIntoWeeks(sessions, followedSessions, timezone)

  if (!isMounted) return null

  return (
    <div className="max-w-2xl w-full mx-auto px-4 py-6">
      <Preferences />
      {weeks.length > 0 ? <WeekList weeks={weeks} /> : isFollowingSessions && (
        <div className="text-center">
          <h1 className="font-semibold">Season finished</h1>
          <h2 className="text-gray-700">All the series' you follow have finished, check back next year</h2>
        </div>
      )}
    </div>
  )
}

export default Home