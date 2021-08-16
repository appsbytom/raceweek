import { Race, Series } from '@/types/race'
import { getFutureRaces } from '@/utils/races'
import useMounted from '@/hooks/useMounted'
import { usePreferences } from '../PreferencesContext/PreferencesContext'
import RaceCard from '../RaceCard'
import Layout from './Layout'

type Props = {
  disclaimer: string
  races: Race[]
  series: Series
}

const SeriesLayout = ({ disclaimer, races, series }: Props) => {
  const isMounted = useMounted()
  const { followedSessions: { [series]: seriesFollowedSessions } } = usePreferences()
  const futureRaces = getFutureRaces(races, seriesFollowedSessions)

  if (!isMounted) return null

  return (
    <Layout disclaimer={disclaimer}>
      {futureRaces.length > 0 ? (
        <div className="space-y-4">
          {futureRaces.map(race => <RaceCard key={race.id} race={race} isNextRace={race.id === futureRaces[0].id} />)}
        </div>
      ) : (
        <div className="text-center">
          <h1 className="font-semibold">Season finished</h1>
          <h2 className="text-gray-700">Next seasons races will appear once available</h2>
        </div>
      )}
    </Layout>
  )
}

export default SeriesLayout