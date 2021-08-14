import SeriesLayout from '@/components/Layout/SeriesLayout'
import { getRaces } from '@/lib/f2f3/f3'
import { Race, Series } from '@/types/race'

type Props = {
  races: Race[]
}

export const getStaticProps = async () => ({ props: { races: await getRaces() }})

const F3 = ({ races }: Props) => (
  <SeriesLayout
    series={Series.F3}
    races={races}
    disclaimer="FIA FORMULA 3 CHAMPIONSHIP, FIA FORMULA 3, FORMULA 3, F3 are trademarks of the FIA."
  />
)

export default F3