import SeriesLayout from '@/components/Layout/SeriesLayout'
import { getRaces } from '@/lib/wseries'
import { Race } from '@/types/race'

type Props = {
  races: Race[]
}

export const getStaticProps = async () => ({ props: { races: getRaces() }})

const WSeries = ({ races }: Props) => (
  <SeriesLayout
    disclaimer="Not affiliated with W Series"
    races={races}
  />
)

export default WSeries