import SeriesLayout from '@/components/Layout/SeriesLayout'
import { getEvents } from '@/lib/fe'
import { Event, Series } from '@/types/event'

type Props = {
  events: Event[]
}

export const getStaticProps = async () => ({ props: { events: getEvents() }})

const FE = ({ events }: Props) => (
  <SeriesLayout
    series={Series.FE}
    disclaimer="Formula-E, FIA FORMULA-E CHAMPIONSHIP & E-Prix are trademarks of the FIA."
    events={events}
  />
)

export default FE