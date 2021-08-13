import { FollowedSessions, Race } from '@/types/race'
import { getFutureRaces } from '@/utils/races'
import RaceCard from '../RaceCard'
import Layout from './Layout'

type Props = {
  disclaimer: string
  races: Race[]
  followedSessions: FollowedSessions
}

const SeriesLayout = ({ disclaimer, races, followedSessions }: Props) => {
  const futureRaces = getFutureRaces(races, followedSessions)

  return (
    <Layout disclaimer={disclaimer}>
      <div className="space-y-4">
        {futureRaces.map(race => <RaceCard key={race.id} race={race} isNextRace={race.id === futureRaces[0].id} />)}
      </div>
    </Layout>
  )
}

export default SeriesLayout