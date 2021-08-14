import SeriesLayout from '@/components/Layout/SeriesLayout'
import { getRaces } from '@/lib/fe'
import { Race, Series } from '@/types/race'

type Props = {
  races: Race[]
}

export const getStaticProps = async () => ({ props: { races: getRaces() }})

const FE = ({ races }: Props) => (
  <SeriesLayout
    series={Series.FE}
    disclaimer="Formula-E, FIA FORMULA-E CHAMPIONSHIP & E-Prix are trademarks of the FIA."
    races={races}
  />
)

export default FE