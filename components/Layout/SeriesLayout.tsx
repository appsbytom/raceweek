import { Race } from '@/types/race'
import dayjs from 'dayjs'
import RaceCard from '../RaceCard'
import Layout from './Layout'

type Props = {
  disclaimer: string
  races: Race[]
}

const SeriesLayout = ({ disclaimer, races }: Props) => {
  const futureRaces = races.filter(race => dayjs(race.sessions[race.sessions.length - 1].endTime).isSameOrAfter(dayjs()) || race.provisional)

  return (
    <Layout disclaimer={disclaimer}>
      <div className="space-y-4">
        {futureRaces.map(race => <RaceCard key={race.id} race={race} isNextRace={race.id === futureRaces[0].id} />)}
      </div>
    </Layout>
  )
}

export default SeriesLayout