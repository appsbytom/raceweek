import Week from '@/types/week'
import { getSeriesNames } from '@/utils/series'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import * as Accordion from '@radix-ui/react-accordion'
import dayjs from 'dayjs'
import ActivityList from './ActivityList'
import { usePreferences } from './PreferencesContext/PreferencesContext'

const format = (date: dayjs.Dayjs) => date.format('D MMM')

type Props = {
  weeks: Week[]
}

const WeekList = ({ weeks }: Props) => {
  const { timezone } = usePreferences()

  return (
    <Accordion.Root type="multiple" asChild>
      <ol>
        {weeks.map(({ date, days }) => {
          const { 0: { date: firstDayDate }, [days.length - 1]: { date: lastDayDate } } = days
          const firstDay = dayjs(firstDayDate).tz(timezone)
          const lastDay = dayjs(lastDayDate).tz(timezone)

          const includedSeries = days.flatMap(day => [...day.sessions.map(session => session.series), ...day.provisionalEvents.map(event => event.series)])

          return (
            <Accordion.Item key={date} value={date} asChild>
              <li>
                <Accordion.Header asChild>
                  <Accordion.Trigger className="flex gap-2 items-center group w-full py-2 px-3">
                    <ChevronDownIcon className="size-5 group-radix-state-open:rotate-180" />
                    <div className="flex gap-2 items-baseline">
                      <h1>
                        {days.length > 1 ? `${firstDay.month() === lastDay.month() ? firstDay.format('D') : format(firstDay)} - ${format(lastDay)}` : format(firstDay)}
                      </h1>
                      <p className="text-xs font-semibold group-radix-state-open:hidden">{getSeriesNames(series => includedSeries.includes(series.value))}</p>
                    </div>
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content asChild>
                  <ol>
                    {days.map(({ date, sessions, provisionalEvents }) => (
                      <li key={date}>
                        <h2 className="bg-gray-50 border-b py-2 px-3 text-sm font-semibold">{dayjs(date).format('dddd')}</h2>
                        <ActivityList sessions={sessions} provisionalEvents={provisionalEvents} />
                      </li>
                    ))}
                  </ol>
                </Accordion.Content>
              </li>
            </Accordion.Item>
          )
        })}
      </ol>
    </Accordion.Root>
  )
}

export default WeekList