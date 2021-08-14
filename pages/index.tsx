import Layout from '@/components/Layout/Layout'
import Unconfirmed from '@/components/Unconfirmed'
import { usePreferences } from '@/components/PreferencesContext/PreferencesContext'
import { getRaces as getF1Races } from '@/lib/f1/f1'
import { getRaces as getF2Races } from '@/lib/f2f3/f2'
import { getRaces as getF3Races } from '@/lib/f2f3/f3'
import { getRaces as getFERaces } from '@/lib/fe'
import { getRaces as getWSeriesRaces } from '@/lib/wseries'
import { FollowedSessions, Race, Series, Session } from '@/types/race'
import { toTimezone } from '@/utils/dateTimeFormatter'
import { getFutureRaces } from '@/utils/races'
import classNames from 'classnames'
import dayjs from 'dayjs'

type GroupedSession = Session & { series: string, raceName: string }

const seriesColourMap = {
  [Series.F1]: 'bg-f1',
  [Series.F2]: 'bg-gradient-to-b from-f2 to-f2-accent',
  [Series.F3]: 'bg-gradient-to-b from-f3 to-f3-accent',
  [Series.FE]: 'bg-fe',
  [Series.WSeries]: 'bg-wseries'
}

const getFollowedSeriesRaces = (races: Race[], followedSessions: FollowedSessions) => followedSessions.length > 0 ? getFutureRaces(races, followedSessions) : []

type Props = {
  f1Races: Race[]
  f2Races: Race[]
  f3Races: Race[]
  feRaces: Race[]
  wseriesRaces: Race[]
}

export const getStaticProps = async () => {
  const f1Races = await getF1Races()
  const f2Races = await getF2Races()
  const f3Races = await getF3Races()
  const feRaces = getFERaces()
  const wseriesRaces = getWSeriesRaces()

  return {
    props: {
      f1Races,
      f2Races,
      f3Races,
      feRaces,
      wseriesRaces
    }
  }
}

const Home = ({ f1Races, f2Races, f3Races, feRaces, wseriesRaces }: Props) => {
  const { followedSessions } = usePreferences()

  const grouped = [
    ...getFollowedSeriesRaces(f1Races, followedSessions.f1),
    ...getFollowedSeriesRaces(f2Races, followedSessions.f2),
    ...getFollowedSeriesRaces(f3Races, followedSessions.f3),
    ...getFollowedSeriesRaces(feRaces, followedSessions.fe),
    ...getFollowedSeriesRaces(wseriesRaces, followedSessions.wseries)
  ]
    .flatMap(race => race.sessions.map(session => ({ ...session, series: race.series, raceName: race.name })))
    .filter(session => dayjs(session.endTime).isSameOrAfter(dayjs()))
    .sort((a, b) => Number(new Date(a.startTime)) - Number(new Date(b.startTime)) )
    .reduce((acc, session) => {
      const dateKey = dayjs(session.startTime).format('YYYY/MM/DD')
      if (!acc[dateKey]) {
        acc[dateKey] = []
      }
      acc[dateKey].push(session)
      return acc;
    }, {})
  const groupedSessions = Object.entries<GroupedSession[]>(grouped).map(([date, sessions]) => ({ date, sessions }))

  return (
    <Layout>
      {groupedSessions.length > 0 ? (
        <div className="space-y-4">
          {groupedSessions.map(group => (
            <div key={group.date}>
              <h1 className="mb-2">{dayjs(group.date).format('dddd D MMMM')}</h1>
              <div className="border border-gray-200">
                {group.sessions.map(session => (
                  <div key={session.id} className="border-b last:border-b-0 flex">
                    <div className={classNames('w-3', seriesColourMap[session.series])} />
                    <div className="py-2 px-4 flex items-center space-x-2">
                      <h2>{session.raceName}: {session.name}</h2>
                      <small>{toTimezone(session.startTime).format('HH:mm')} <Unconfirmed unconfirmed={session.unconfirmed} /></small>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center">
          <h1 className="font-semibold">You are not following any series</h1>
          <h2 className="text-gray-700">Visit the series' page you are interested in and select the sessions you wish to follow</h2>
        </div>
      )}
    </Layout>
  )
}

export default Home