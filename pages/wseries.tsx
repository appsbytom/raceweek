import SeriesLayout from '@/components/Layout/SeriesLayout'
import { getEvents } from '@/lib/wseries'
import { Event, Series } from '@/types/event'

type Props = {
  events: Event[]
}

export const getStaticProps = async () => ({ props: { events: await getEvents() }})

const WSeries = ({ events }: Props) => (
  <SeriesLayout
    series={Series.WSeries}
    disclaimer="Not affiliated with W Series"
    events={events}
  />
)

export default WSeries