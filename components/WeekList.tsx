import Week from '@/types/week'
import { getSeriesNames } from '@/utils/series'
import { Disclosure } from '@headlessui/react'
import dayjs from 'dayjs'
import DisclosureChevronButton from './DisclosureChevronButton'
import { usePreferences } from './PreferencesContext/PreferencesContext'
import ProvisionalEventActivity from './ProvisionalEventActivity'
import SessionActivity from './SessionActivity'

const format = (date: dayjs.Dayjs) => date.format('D MMMM')

type Props = {
  weeks: Week[]
}

const WeekList = ({ weeks }: Props) => {
  const { timezone } = usePreferences()

  return (
    <ol className="space-y-4">
      {weeks.map(({ number, days }) => {
        const { 0: { date: firstDayDate }, [days.length - 1]: { date: lastDayDate }} = days
        const firstDayFormatted = format(dayjs(firstDayDate).tz(timezone))

        const includedSeries = days.flatMap(day => [...day.sessions.map(session => session.series), ...day.provisionalEvents.map(event => event.series)])

        return (
          <Disclosure key={number} defaultOpen={number === weeks[0].number}>
            {({ open }) => (
              <li>
                <DisclosureChevronButton open={open}>
                  {number === dayjs().tz(timezone).isoWeek() ? (
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
                </DisclosureChevronButton>
                <Disclosure.Panel as="ol" className="space-y-2 mt-1">
                  {days.map(({ date, sessions, provisionalEvents }) => (
                    <li key={date}>
                      <h2 className="mb-1">{dayjs(date).format('dddd')}</h2>
                      <ol className="border border-gray-200">
                        {sessions.map(session => <SessionActivity key={session.id} session={session} />)}
                        {provisionalEvents.map(event => <ProvisionalEventActivity key={event.id} event={event} />)}
                      </ol>
                    </li>
                  ))}
                </Disclosure.Panel>
              </li>
            )}
          </Disclosure>
        )
      })}
    </ol>
  )
}

export default WeekList