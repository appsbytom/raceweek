import { Series } from '@/types/event'
import { GroupedSession } from '@/types/week'
import classNames from 'classnames'
import dayjs from 'dayjs'
import { usePreferences } from './PreferencesContext/PreferencesContext'

const SERIES_COLOUR = {
  [Series.F1]: 'bg-f1',
  [Series.F2]: 'bg-gradient-to-b from-f2 to-f2-accent',
  [Series.F3]: 'bg-gradient-to-b from-f3 to-f3-accent',
  [Series.FE]: 'bg-fe',
  [Series.WSeries]: 'bg-wseries'
}

type Props = {
  sessions: GroupedSession[]
}

const SessionList = ({ sessions }: Props) => {
  const { timezone, use24HourFormat } = usePreferences()

  return (
    <div className="border border-gray-200">
      {sessions.map(session => (
        <div key={session.id} className="border-b last:border-b-0 flex">
          <div className={classNames('w-3', SERIES_COLOUR[session.series])} />
          <div className="py-2 px-4 flex flex-1 items-center space-x-2">
            <h2>{session.eventName}: {session.name}</h2>
            <small>{dayjs(session.startTime).tz(timezone).format(use24HourFormat ? 'HH:mm' : 'h:mm A')} {session.unconfirmed && <span className="font-semibold">(TBC)</span>}</small>
          </div>
        </div>
      ))}
    </div>
  )
}

export default SessionList