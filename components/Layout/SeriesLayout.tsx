import useMounted from '@/hooks/useMounted'
import { Event, Series } from '@/types/event'
import { getFutureEventsWithFollowedSessions } from '@/utils/events'
import FollowedSessions from '../FollowedSessions'
import { usePreferences } from '../PreferencesContext/PreferencesContext'
import EventCard from '../EventCard'
import Layout from './Layout'

type Props = {
  disclaimer: string
  events: Event[]
  series: Series
}

const SeriesLayout = ({ disclaimer, events, series }: Props) => {
  const isMounted = useMounted()
  const { followedSessions: { [series]: seriesFollowedSessions } } = usePreferences()
  const futureEvents = getFutureEventsWithFollowedSessions(events, seriesFollowedSessions)

  if (!isMounted) return null

  return (
    <Layout disclaimer={disclaimer}>
      <FollowedSessions series={series} />
      {futureEvents.length > 0 ? (
        <div className="space-y-4">
          {futureEvents.map(event => <EventCard key={event.id} event={event} isNextEvent={event.id === futureEvents[0].id} />)}
        </div>
      ) : (
        <div className="text-center">
          <h1 className="font-semibold">Season finished</h1>
          <h2 className="text-gray-700">Next seasons events will appear once available</h2>
        </div>
      )}
    </Layout>
  )
}

export default SeriesLayout