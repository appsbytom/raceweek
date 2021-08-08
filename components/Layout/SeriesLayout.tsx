import { Race } from '@/types/race'
import { getFutureRaces } from '@/utils/races'
import RaceCard from '../RaceCard'
import Layout from './Layout'

type Props = {
  disclaimer: string
  races: Race[]
}

const SeriesLayout = ({ disclaimer, races }: Props) => {
  const futureRaces = getFutureRaces(races)

  return (
    <Layout disclaimer={disclaimer}>
      <div className="space-y-4">
        {futureRaces.map(race => <RaceCard key={race.id} race={race} isNextRace={race.id === futureRaces[0].id} />)}
      </div>
    </Layout>
  )
}

export default SeriesLayout