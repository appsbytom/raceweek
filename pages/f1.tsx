import SeriesLayout from '@/components/Layout/SeriesLayout'
import { getEvents } from '@/lib/f1/f1'
import { Event, Series } from '@/types/event'

type Props = {
  events: Event[]
}

export const getStaticProps = async () => ({ props: { events: await getEvents() }})

const F1 = ({ events }: Props) => (
  <SeriesLayout
    series={Series.F1}
    events={events}
    disclaimer="Formula One, Formula 1, F1 & Grand Prix are trademarks of Formula One Licensing BV."
  />
)

export default F1