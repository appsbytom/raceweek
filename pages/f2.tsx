import SeriesLayout from '@/components/Layout/SeriesLayout'
import { getEvents } from '@/lib/f2f3/f2'
import { Event, Series } from '@/types/event'

type Props = {
  events: Event[]
}

export const getStaticProps = async () => ({ props: { events: await getEvents() }})

const F2 = ({ events }: Props) => (
  <SeriesLayout
    series={Series.F2}
    events={events}
    disclaimer="FIA FORMULA 2 CHAMPIONSHIP, FIA FORMULA 2, FORMULA 2, F2 are trademarks of the FIA."
  />
)

export default F2