import { Race, RaceStatus } from '@/types/race'
import { formatToDate, formatToTimeWithTimezone } from '@/utils/dateTimeFormatter'
import { Disclosure } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import classNames from 'classnames'

type Props = {
  race: Race
}

const RaceCard = ({ race: { name, sessions, status, provisional } }: Props) => {
  const { 0: firstSession, [sessions.length - 1]: lastSession} = sessions
  const sessionDateRange = `${formatToDate(firstSession.startTime)} - ${formatToDate(lastSession.startTime)}`;

  if (status === RaceStatus.COMPLETED || provisional) {
    return (
      <div className={classNames('border border-gray-200 rounded flex items-center p-4 space-x-2', { 'line-through': !provisional })}>
        <h2>{name}</h2>
        <small>{provisional ? 'No date set' : sessionDateRange}</small>
      </div>
    )
  }

  return (
    <Disclosure as="div" className="border border-gray-200 rounded hover:shadow" defaultOpen={true}>
      {({ open }) => (
        <>
          <Disclosure.Button className="flex items-center p-4 space-x-2 w-full">
            <ChevronDownIcon className={classNames('w-5 h-5', { 'transform rotate-180': open })} />
            <h2>{name}</h2>
            <small>{sessionDateRange}</small>
          </Disclosure.Button>
          <Disclosure.Panel className="pb-4 pr-4 pl-11 space-y-1">
            {sessions.map(session => (
              <h3 key={session.id} className="text-sm">{session.name}: {formatToTimeWithTimezone(session.startTime)} {session.unconfirmed && <span className="font-semibold">(TBC)</span>}</h3>
            ))}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}

export default RaceCard