import Preferences from '@/components/Preferences'
import { usePreferences } from '@/components/PreferencesContext/PreferencesContext'
import useMounted from '@/hooks/useMounted'
import { getEvents as getF1Events } from '@/lib/f1/f1'
import { getEvents as getF2Events } from '@/lib/f2f3/f2'
import { getEvents as getF3Events } from '@/lib/f2f3/f3'
import { getEvents as getFEEvents } from '@/lib/fe'
import { getEvents as getWSeriesEvents } from '@/lib/wseries'
import Event, { Series } from '@/types/event'
import Session, { FollowedSessions } from '@/types/session'
import { getFutureEvents } from '@/utils/events'
import classNames from 'classnames'
import dayjs from 'dayjs'
import { GetStaticProps } from 'next'

type GroupedSession = Session & { series: Series, eventName: string }

const seriesColourMap = {
  [Series.F1]: 'bg-f1',
  [Series.F2]: 'bg-gradient-to-b from-f2 to-f2-accent',
  [Series.F3]: 'bg-gradient-to-b from-f3 to-f3-accent',
  [Series.FE]: 'bg-fe',
  [Series.WSeries]: 'bg-wseries'
}

const getFollowedSeriesEvents = (events: Event[], followedSessions: FollowedSessions) => followedSessions.length > 0
  ? getFutureEvents(events).map(event => ({ ...event, sessions: event.sessions.filter(session => followedSessions.includes(session.type)) }))
  : []

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
  const { followedSessions, timezone, use24HourFormat } = usePreferences()

  const grouped = [
    ...getFollowedSeriesEvents(f1Events, followedSessions.f1),
    ...getFollowedSeriesEvents(f2Events, followedSessions.f2),
    ...getFollowedSeriesEvents(f3Events, followedSessions.f3),
    ...getFollowedSeriesEvents(feEvents, followedSessions.fe),
    ...getFollowedSeriesEvents(wseriesEvents, followedSessions.wseries)
  ]
    .flatMap(event => event.sessions.map(session => ({ ...session, series: event.series, eventName: event.name })))
    .filter(session => dayjs(session.endTime).isSameOrAfter(dayjs()))
    .sort((a, b) => Number(new Date(a.startTime)) - Number(new Date(b.startTime)) )
    .reduce((acc, session) => {
      const dateKey = dayjs(session.startTime).tz(timezone).format('YYYY/MM/DD')
      if (!acc[dateKey]) {
        acc[dateKey] = []
      }
      acc[dateKey].push(session)
      return acc;
    }, {})
  const groupedSessions = Object.entries<GroupedSession[]>(grouped).map(([date, sessions]) => ({ date, sessions }))

  if (!isMounted) return null

  return (
    <div className="max-w-2xl w-full mx-auto px-4 py-6">
      <Preferences />
      {groupedSessions.length > 0 && (
        <div className="space-y-4">
          {groupedSessions.map(group => (
            <div key={group.date}>
              <h1 className="mb-2">{dayjs(group.date).format('dddd D MMMM')}</h1>
              <div className="border border-gray-200">
                {group.sessions.map(session => (
                  <div key={session.id} className="border-b last:border-b-0 flex">
                    <div className={classNames('w-3', seriesColourMap[session.series])} />
                    <div className="py-2 px-4 flex flex-1 items-center space-x-2">
                      <h2>{session.eventName}: {session.name}</h2>
                      <small>{dayjs(session.startTime).tz(timezone).format(use24HourFormat ? 'HH:mm' : 'h:mm A')} {session.unconfirmed && <span className="font-semibold">(TBC)</span>}</small>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Home