import { GroupedSession } from '@/types/week'
import dayjs from 'dayjs'
import Activity from './Activity'
import { usePreferences } from './PreferencesContext/PreferencesContext'

type Props = {
  session: GroupedSession
}

const SessionActivity = ({ session }: Props) => {
  const { timezone, use24HourFormat } = usePreferences()

  return (
    <Activity series={session.series}>
      <h2>{session.eventName}: {session.name}</h2>
      <small>
        {dayjs(session.startTime).tz(timezone).format(use24HourFormat ? 'HH:mm' : 'h:mm A')} {session.unconfirmed && <span className="font-semibold">(TBC)</span>}
      </small>
    </Activity>
  )
}

export default SessionActivity