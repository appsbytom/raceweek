import Event from '@/types/event'
import Activity from './Activity'

type Props = {
  event: Event
}

const ProvisionalEventActivity = ({ event }: Props) => (
  <Activity series={event.series}>
    <h2>{event.name}</h2>
    <small className="font-semibold">(TBC)</small>
  </Activity>
)

export default ProvisionalEventActivity