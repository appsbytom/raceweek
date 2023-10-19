import Week from '@/types/week'
import dayjs from 'dayjs'
import calendar from 'dayjs/plugin/calendar'
import relativeTime from 'dayjs/plugin/relativeTime'
import ActivityList from './ActivityList'
import { usePreferences } from './PreferencesContext/PreferencesContext'
import Countdown from './Countdown'

dayjs.extend(calendar)
dayjs.extend(relativeTime)

type Props = {
  week: Week
}

const UpNext = ({ week: { days } }: Props) => {
  const { timezone } = usePreferences()

  return (
    <ol className="mb-3">
      {days.map(({ date, sessions, provisionalEvents }, index) => (
        <li key={date}>
          <h1 className="bg-gray-50 border-b py-2 px-3 font-semibold">
            {dayjs(date).tz(timezone).calendar(dayjs().tz(timezone), {
              sameDay: '[Today]',
              nextDay: '[Tomorrow]',
              nextWeek: 'dddd, D MMM',
              sameElse: 'dddd, D MMM'
            })}
          </h1>
          {index === 0 && (
            <div className="px-3 pt-2 flex justify-center">
              <div className="bg-gray-100 px-2.5 py-0.5 rounded-full">
                <Countdown
                  startTime={sessions[0]?.startTime ?? provisionalEvents[0].raceDate}
                  series={sessions[0]?.series ?? provisionalEvents[0].series}
                />
              </div>
            </div>
          )}
          <ActivityList sessions={sessions} provisionalEvents={provisionalEvents} />
        </li>
      ))}
    </ol>
  );
}

export default UpNext