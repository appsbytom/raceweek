import Event from '@/types/event'
import { GroupedSession } from '@/types/week'
import Activity from './Activity'
import SessionActivity from './SessionActivity'

type Props = {
  sessions: GroupedSession[]
  provisionalEvents: Event[]
}

const ActivityList = ({ sessions, provisionalEvents }: Props) => (
  <ol className="divide-y">
    {sessions.map(session => <SessionActivity key={session.id} session={session} />)}
    {provisionalEvents.map(event => <Activity key={event.id} date="TBC" series={event.series} name={event.name} />)}
  </ol>
)

export default ActivityList