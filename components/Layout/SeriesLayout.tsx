import { Race } from '@/types/race'
import dayjs from 'dayjs'
import RaceCard from '../RaceCard'
import Layout from './Layout'

type Props = {
  disclaimer: string
  races: Race[]
}

const SeriesLayout = ({ disclaimer, races }: Props) => {
  const { 0: nextRace } = races.filter(race => dayjs(race.sessions[race.sessions.length - 1].endTime).isSameOrAfter(dayjs()))

  return (
    <Layout disclaimer={disclaimer}>
      <div className="space-y-4">
        {races.map(race => <RaceCard key={race.id} race={race} isNextRace={nextRace.id === race.id} />)}
      </div>
    </Layout>
  )
}

export default SeriesLayout