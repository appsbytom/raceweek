import { Race, Series } from '@/types/race'
import { getFutureRaces } from '@/utils/races'
import { usePreferences } from '../PreferencesContext/PreferencesContext'
import RaceCard from '../RaceCard'
import Layout from './Layout'

type Props = {
  disclaimer: string
  races: Race[]
  series: Series
}

const SeriesLayout = ({ disclaimer, races, series }: Props) => {
  const { followedSessions: { [series]: seriesFollowedSessions } } = usePreferences()
  const futureRaces = getFutureRaces(races, seriesFollowedSessions)

  return (
    <Layout disclaimer={disclaimer}>
      <div className="space-y-4">
        {futureRaces.map(race => <RaceCard key={race.id} race={race} isNextRace={race.id === futureRaces[0].id} />)}
      </div>
    </Layout>
  )
}

export default SeriesLayout