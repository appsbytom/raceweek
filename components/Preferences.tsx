import { Series } from '@/types/event'
import { Type } from '@/types/session'
import { Disclosure } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/outline'
import classNames from 'classnames'
import { ChangeEvent, useState } from 'react'
import TimezoneSelect from 'react-timezone-select'
import { usePreferences } from './PreferencesContext/PreferencesContext'

const seriesList = [
  { value: Series.F1, name: 'F1' },
  { value: Series.F2, name: 'F2' },
  { value: Series.F3, name: 'F3' },
  { value: Series.FE, name: 'FE' },
  { value: Series.WSeries, name: 'W Series' }
]

const sessions = [
  { value: Type.Practice, name: 'Practice' },
  { value: Type.Qualifying, name: 'Qualifying' },
  { value: Type.Race, name: 'Race' }
]

const Preferences = () => {
  const { followedSessions: savedFollowedSessions, timezone: savedTimezone, save: savePref } = usePreferences()
  const [followedSessions, setFollowedSessions] = useState(savedFollowedSessions)
  const [timezone, setTimezone] = useState(savedTimezone)
  const [isOpen, setIsOpen] = useState(false)

  const save = () => {
    savePref(followedSessions, timezone)
    setIsOpen(false)
  }

  const cancel = () => {
    setTimezone(savedTimezone)
    setFollowedSessions(savedFollowedSessions)
    setIsOpen(false)
  }

  const onChange = (event: ChangeEvent<HTMLInputElement>, series: Series, session: string) => {
    if (event.target.checked) {
      setFollowedSessions(prevState => ({ ...prevState, [series]: [...prevState[series], session] }))
    } else {
      setFollowedSessions(prevState => ({ ...prevState, [series]: prevState[series].filter(prevSession => prevSession !== session) }))
    }
  }

  return (
    <div className="rounded-lg shadow px-3 py-4 mb-6 text-gray-700">
      {isOpen ? (
        <>
          <div className="mb-3">
            <div className="grid sm:grid-cols-2 gap-2">
              {seriesList.map(({ value: seriesValue, name: seriesName }) => {
                const seriesFollowedSessions = followedSessions[seriesValue]
                return (
                  <Disclosure key={seriesValue} as="div" defaultOpen={seriesFollowedSessions.length > 0}>
                    {({ open }) => (
                      <>
                        <Disclosure.Button className="flex items-center space-x-2 w-full text-gray-400 hover:text-gray-500">
                          <ChevronDownIcon className={classNames('w-4 h-4', { 'transform rotate-180': open })}/>
                          <h2 className="text-gray-700">{seriesName}</h2>
                        </Disclosure.Button>
                        <Disclosure.Panel className="flex items-center space-x-4 mt-1">
                          {sessions.map(({ value: sessionValue, name: sessionName }) => {
                            const id = `${seriesValue}-${sessionValue}`
                            return (
                              <div key={id} className="flex items-center space-x-2">
                                <input
                                  id={id}
                                  type="checkbox"
                                  checked={seriesFollowedSessions.includes(sessionValue)}
                                  onChange={event => onChange(event, seriesValue, sessionValue)}
                                />
                                <label htmlFor={id}>{sessionName}</label>
                              </div>
                            )
                          })}
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                )
              })}
            </div>
            <div className="mt-3 sm:w-1/2">
              <label htmlFor="timezoneSelect" className="block mb-2">Timezone</label>
              <TimezoneSelect
                inputId="timezoneSelect"
                value={timezone}
                onChange={selectedTimezone => setTimezone(selectedTimezone.value)}
                styles={{
                  menuList: (provided) => ({ ...provided, paddingTop: 0, paddingBottom: 0 })
                }}
              />
            </div>
          </div>
          <div className="flex sm:justify-end space-x-3">
            <button
              className="w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white font-medium hover:bg-gray-50 sm:w-auto"
              onClick={cancel}
            >
              Cancel
            </button>
            <button
              className="w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 font-medium text-white hover:bg-green-700 sm:w-auto"
              onClick={save}
            >
              Save
            </button>
          </div>
        </>
      ) : (
        <div className="sm:flex sm:justify-between sm:items-center">
          <div className="mb-3 text-center sm:text-left sm:mb-0 sm:w-2/3">
            {Object.values(savedFollowedSessions).flat().length > 0 ? (
              <>
                <h1>You are following <strong>{seriesList.filter(series => savedFollowedSessions[series.value].length > 0).map(series => series.name).join(', ')}</strong></h1>
                <h2>Your timezone is {savedTimezone}</h2>
              </>
            ) : (
              <>
                <h1 className="font-semibold">You are not following any series</h1>
                <h2 className="text-gray-700">Expand the series' you are interested in and select the sessions you wish to follow</h2>
              </>
            )}
          </div>
          <button
            className="w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white font-medium hover:bg-gray-50 sm:w-auto"
            onClick={() => setIsOpen(true)}
          >
            Update preferences
          </button>
        </div>
      )}
    </div>
  )
}

export default Preferences