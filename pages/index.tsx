import Preferences from '@/components/Preferences'
import { usePreferences } from '@/components/PreferencesContext/PreferencesContext'
import WeekList from '@/components/WeekList'
import useMounted from '@/hooks/useMounted'
import { getEvents as getF1Events } from '@/lib/f1/f1'
import { getEvents as getF2Events } from '@/lib/f2f3/f2'
import { getEvents as getF3Events } from '@/lib/f2f3/f3'
import { getEvents as getFEEvents } from '@/lib/fe'
import { getEvents as getWSeriesEvents } from '@/lib/wseries'
import Event from '@/types/event'
import { groupIntoWeeks } from '@/utils/grouping'
import { GetStaticProps } from 'next'

type Props = {
  f1Events: Event[]
  f2Events: Event[]
  f3Events: Event[]
  feEvents: Event[]
  wseriesEvents: Event[]
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const [f1Events, f2Events, f3Events, wseriesEvents] = await Promise.all([getF1Events(), getF2Events(), getF3Events(), getWSeriesEvents()])
  const feEvents = getFEEvents()

  return {
    props: {
      f1Events,
      f2Events,
      f3Events,
      feEvents,
      wseriesEvents
    }
  }
}

const Home = ({ f1Events, f2Events, f3Events, feEvents, wseriesEvents }: Props) => {
  const isMounted = useMounted()
  const { followedSessions, timezone } = usePreferences()

  const weeks = groupIntoWeeks(f1Events, f2Events, f3Events, feEvents, wseriesEvents, followedSessions, timezone)

  if (!isMounted) return null

  return (
    <div className="max-w-2xl w-full mx-auto px-4 py-6">
      <Preferences />
      {weeks.length > 0 && <WeekList weeks={weeks} />}
    </div>
  )
}

export default Home