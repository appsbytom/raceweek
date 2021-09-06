import { Event } from '@/types/event'
import { Disclosure } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import classNames from 'classnames'
import dayjs from 'dayjs'
import { usePreferences } from './PreferencesContext/PreferencesContext'
import Unconfirmed from './Unconfirmed'

const formatToDate = date => dayjs(date).format('D MMM')

type Props = {
  event: Event
  isNextEvent: boolean
}

const EventCard = ({ event: { name, sessions, provisional }, isNextEvent }: Props) => {
  const { timezone } = usePreferences()
  const { 0: { startTime: firstSessionStartTime }, [sessions.length - 1]: { startTime: lastSessionStartTime }} = sessions
  const firstSessionDate = formatToDate(firstSessionStartTime)
  const sessionDateRange = (sessions.length > 1 && !dayjs(firstSessionStartTime).isSame(lastSessionStartTime, 'day')) ? `${firstSessionDate} - ${formatToDate(lastSessionStartTime)}` : firstSessionDate;

  if (provisional) {
    return (
      <div className="border border-gray-200 rounded flex items-center p-4 space-x-2">
        <h2>{name}</h2>
        <small>No date set</small>
      </div>
    )
  }

  return (
    <Disclosure as="div" className="border border-gray-200 rounded hover:shadow" defaultOpen={isNextEvent}>
      {({ open }) => (
        <>
          <Disclosure.Button className="flex items-center p-4 space-x-2 w-full">
            <ChevronDownIcon className={classNames('w-5 h-5', { 'transform rotate-180': open })} />
            <h2>{name}</h2>
            <small>{sessionDateRange}</small>
          </Disclosure.Button>
          <Disclosure.Panel className="pb-4 pr-4 pl-11 space-y-1">
            {sessions.map(session => (
              <h3 key={session.id} className={classNames('text-sm', { 'line-through': dayjs(session.endTime).isBefore(dayjs()) })}>
                {session.name}: {dayjs(session.startTime).tz(timezone).format('ddd HH:mm')} <Unconfirmed unconfirmed={session.unconfirmed} />
              </h3>
            ))}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}

export default EventCard