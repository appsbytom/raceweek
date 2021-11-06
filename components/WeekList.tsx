import Week from '@/types/week'
import { getSeriesNames } from '@/utils/series'
import { Disclosure } from '@headlessui/react'
import dayjs from 'dayjs'
import DisclosureChevronButton from './DisclosureChevronButton'
import { usePreferences } from './PreferencesContext/PreferencesContext'
import SessionList from './SessionList'

const format = (date: dayjs.Dayjs) => date.format('D MMMM')

type Props = {
  weeks: Week[]
}

const WeekList = ({ weeks }: Props) => {
  const { timezone } = usePreferences()

  return (
    <div className="space-y-4">
      {weeks.map(({ number, days }) => {
        const { 0: { date: firstDayDate }, [days.length - 1]: { date: lastDayDate }} = days
        const firstDayFormatted = format(dayjs(firstDayDate).tz(timezone))

        const includedSeries = days.flatMap(day => day.sessions.map(session => session.series))

        return (
          <Disclosure defaultOpen={number === weeks[0].number}>
            {({ open }) => (
              <div>
                <DisclosureChevronButton open={open}>
                  <h1>{days.length > 1 ? `${firstDayFormatted} - ${format(dayjs(lastDayDate).tz(timezone))}` : firstDayFormatted}</h1>
                  <small className="font-bold">{getSeriesNames(series => includedSeries.includes(series.value))}</small>
                </DisclosureChevronButton>
                <Disclosure.Panel className="space-y-2 mt-1">
                  {days.map(({ date, sessions }) => (
                    <div key={date}>
                      <h2 className="mb-1">{dayjs(date).format('dddd')}</h2>
                      <SessionList sessions={sessions} />
                    </div>
                  ))}
                </Disclosure.Panel>
              </div>
            )}
          </Disclosure>
        )
      })}
    </div>
  )
}

export default WeekList