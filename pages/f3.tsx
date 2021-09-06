import SeriesLayout from '@/components/Layout/SeriesLayout'
import { getEvents } from '@/lib/f2f3/f3'
import { Event, Series } from '@/types/event'

type Props = {
  events: Event[]
}

export const getStaticProps = async () => ({ props: { events: await getEvents() }})

const F3 = ({ events }: Props) => (
  <SeriesLayout
    series={Series.F3}
    events={events}
    disclaimer="FIA FORMULA 3 CHAMPIONSHIP, FIA FORMULA 3, FORMULA 3, F3 are trademarks of the FIA."
  />
)

export default F3