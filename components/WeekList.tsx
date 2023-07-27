import AccordionChevronTrigger from '@/components/AccordionChevronTrigger'
import Week from '@/types/week'
import { getSeriesNames } from '@/utils/series'
import * as Accordion from '@radix-ui/react-accordion'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import Activity from './Activity'
import { usePreferences } from './PreferencesContext/PreferencesContext'
import SessionActivity from './SessionActivity'

const format = (date: dayjs.Dayjs) => date.format('D MMM')

type Props = {
  weeks: Week[]
}

const WeekList = ({ weeks }: Props) => {
  const { timezone } = usePreferences()
  const [expanded, setExpanded] = useState<string[]>([])

  useEffect(() => {
    setExpanded([weeks[0].date])
  }, [weeks])

  return (
    <Accordion.Root type="multiple" value={expanded} onValueChange={setExpanded} asChild>
      <ol>
        {weeks.map(({ date, weekNumber, days }) => {
          const { 0: { date: firstDayDate }, [days.length - 1]: { date: lastDayDate }} = days
          const firstDay = dayjs(firstDayDate).tz(timezone)
          const lastDay = dayjs(lastDayDate).tz(timezone)

          const includedSeries = days.flatMap(day => [...day.sessions.map(session => session.series), ...day.provisionalEvents.map(event => event.series)])

          return (
            <Accordion.Item key={date} value={date} asChild>
              <li>
                <AccordionChevronTrigger>
                  {weekNumber === dayjs().tz(timezone).isoWeek() ? (
                    <div className="bg-gray-100 flex items-center px-2.5 py-0.5 rounded gap-2">
                      <div className="relative h-2 w-2">
                        <div className="animate-ping absolute h-full w-full rounded-full bg-gray-900" />
                        <div className="relative rounded-full h-full bg-gray-900" />
                      </div>
                      <h1 className="font-medium">It's race week!</h1>
                    </div>
                  ) : (
                    <h1 className="text-lg">
                      {days.length > 1 ? `${firstDay.month() === lastDay.month() ? firstDay.format('D') : format(firstDay)} - ${format(lastDay)}` : format(firstDay)}
                    </h1>
                  )}
                  <p className="text-sm font-bold group-radix-state-open:hidden bg-">{getSeriesNames(series => includedSeries.includes(series.value))}</p>
                </AccordionChevronTrigger>
                <Accordion.Content asChild>
                  <ol>
                    {days.map(({ date, sessions, provisionalEvents }) => (
                      <li key={date}>
                        <h2 className="bg-gray-50 border-b py-2 px-3 font-semibold">{dayjs(date).format('dddd')}</h2>
                        <ol className="divide-y">
                          {sessions.map(session => <SessionActivity key={session.id} session={session} />)}
                          {provisionalEvents.map(event => <Activity key={event.id} date="TBC" series={event.series} name={event.name} />)}
                        </ol>
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