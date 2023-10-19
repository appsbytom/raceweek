import AccordionChevronTrigger from '@/components/AccordionChevronTrigger'
import Week from '@/types/week'
import { getSeriesNames } from '@/utils/series'
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
          const { 0: { date: firstDayDate }, [days.length - 1]: { date: lastDayDate }} = days
          const firstDay = dayjs(firstDayDate).tz(timezone)
          const lastDay = dayjs(lastDayDate).tz(timezone)

          const includedSeries = days.flatMap(day => [...day.sessions.map(session => session.series), ...day.provisionalEvents.map(event => event.series)])

          return (
            <Accordion.Item key={date} value={date} asChild>
              <li>
                <AccordionChevronTrigger>
                  <h1 className="text-lg">
                    {days.length > 1 ? `${firstDay.month() === lastDay.month() ? firstDay.format('D') : format(firstDay)} - ${format(lastDay)}` : format(firstDay)}
                  </h1>
                  <p className="text-sm font-bold group-radix-state-open:hidden bg-">{getSeriesNames(series => includedSeries.includes(series.value))}</p>
                </AccordionChevronTrigger>
                <Accordion.Content asChild>
                  <ol>
                    {days.map(({ date, sessions, provisionalEvents }) => (
                      <li key={date}>
                        <h2 className="bg-gray-50 border-b py-2 px-3 font-semibold">{dayjs(date).format('dddd')}</h2>
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