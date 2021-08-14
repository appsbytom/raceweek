import SeriesLayout from '@/components/Layout/SeriesLayout'
import { getRaces } from '@/lib/wseries'
import { Race, Series } from '@/types/race'

type Props = {
  races: Race[]
}

export const getStaticProps = async () => ({ props: { races: getRaces() }})

const WSeries = ({ races }: Props) => (
  <SeriesLayout
    series={Series.WSeries}
    disclaimer="Not affiliated with W Series"
    races={races}
  />
)

export default WSeries