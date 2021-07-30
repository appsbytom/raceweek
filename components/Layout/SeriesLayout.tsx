import { Race } from '@/types/race'
import RaceCard from '../RaceCard'
import Layout from './Layout'

type Props = {
  disclaimer: string
  races: Race[]
}

const SeriesLayout = ({ disclaimer, races }: Props) => (
  <Layout disclaimer={disclaimer}>
    <div className="space-y-4">
      {races.map(race => <RaceCard key={race.id} race={race} />)}
    </div>
  </Layout>
)

export default SeriesLayout