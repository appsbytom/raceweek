import { GroupedSession } from '@/types/week'
import dayjs from 'dayjs'
import Activity from './Activity'
import { usePreferences } from './PreferencesContext/PreferencesContext'

type Props = {
  session: GroupedSession
}

const SessionActivity = ({ session: { series, eventName, startTime, name, unconfirmed } }: Props) => {
  const { timezone, use24HourFormat } = usePreferences()

  const date = dayjs(startTime).tz(timezone)

  return (
    <Activity
      date={date.format(use24HourFormat ? 'HH:mm' : 'h:mm')}
      dateUnits={!use24HourFormat && date.format('A')}
      name={`${unconfirmed ? '(TBC)' : ''} ${name}`}
      series={series}
      eventName={eventName}
    />
  )
}

export default SessionActivity