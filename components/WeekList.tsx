import Week from '@/types/week'
import { getSeriesNames } from '@/utils/series'
import dayjs from 'dayjs'
import { usePreferences } from './PreferencesContext/PreferencesContext'
import ProvisionalEventActivity from './ProvisionalEventActivity'
import SessionActivity from './SessionActivity'
import { useEffect, useState } from 'react'
import * as Accordion from '@radix-ui/react-accordion'
import AccordionChevronTrigger from '@/components/AccordionChevronTrigger';

const format = (date: dayjs.Dayjs) => date.format('D MMMM')

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
      <ol className="space-y-4">
        {weeks.map(({ date, weekNumber, days }) => {
          const { 0: { date: firstDayDate }, [days.length - 1]: { date: lastDayDate }} = days
          const firstDayFormatted = format(dayjs(firstDayDate).tz(timezone))

          const includedSeries = days.flatMap(day => [...day.sessions.map(session => session.series), ...day.provisionalEvents.map(event => event.series)])

          return (
            <Accordion.Item key={date} value={date} asChild>
              <li>
                <AccordionChevronTrigger>
                  {weekNumber === dayjs().tz(timezone).isoWeek() ? (
                    <div className="bg-gray-100 flex items-center px-2.5 py-0.5 rounded gap-2">
                      <div className="relative h-2 w-2">
                        <div className="animate-ping absolute h-full w-full rounded-full bg-black" />
                        <div className="relative rounded-full h-full bg-black" />
                      </div>
                      <h1 className="text-sm font-medium">It's race week!</h1>
                    </div>
                  ) : (
                    <h1>{days.length > 1 ? `${firstDayFormatted} - ${format(dayjs(lastDayDate).tz(timezone))}` : firstDayFormatted}</h1>
                  )}
                  <small className="font-bold">{getSeriesNames(series => includedSeries.includes(series.value))}</small>
                </AccordionChevronTrigger>
                <Accordion.Content asChild>
                  <ol className="space-y-2 mt-1">
                    {days.map(({ date, sessions, provisionalEvents }) => (
                      <li key={date}>
                        <h2 className="mb-1">{dayjs(date).format('dddd')}</h2>
                        <ol className="border border-gray-200">
                          {sessions.map(session => <SessionActivity key={session.id} session={session} />)}
                          {provisionalEvents.map(event => <ProvisionalEventActivity key={event.id} event={event} />)}
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