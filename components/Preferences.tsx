import { Series } from '@/types/event'
import { Type } from '@/types/session'
import { ALL_SERIES, getSeriesNames } from '@/utils/series'
import { Disclosure, Switch } from '@headlessui/react'
import classNames from 'classnames'
import { ChangeEvent, useState } from 'react'
import TimezoneSelect from 'react-timezone-select'
import DisclosureChevronButton from './DisclosureChevronButton'
import { usePreferences } from './PreferencesContext/PreferencesContext'

const sessions = [
  { value: Type.Practice, name: 'Practice' },
  { value: Type.Qualifying, name: 'Qualifying' },
  { value: Type.Race, name: 'Race' }
]

const Preferences = () => {
  const { followedSessions: savedFollowedSessions, timezone: savedTimezone, use24HourFormat: savedUse24HourFormat, save: savePref } = usePreferences()
  const [followedSessions, setFollowedSessions] = useState(savedFollowedSessions)
  const [timezone, setTimezone] = useState(savedTimezone)
  const [use24HourFormat, setUse24HourFormat] = useState(savedUse24HourFormat)
  const [isOpen, setIsOpen] = useState(false)

  const save = () => {
    savePref(followedSessions, timezone, use24HourFormat)
    setIsOpen(false)
  }

  const cancel = () => {
    setFollowedSessions(savedFollowedSessions)
    setTimezone(savedTimezone)
    setUse24HourFormat(savedUse24HourFormat)
    setIsOpen(false)
  }

  const onChange = (event: ChangeEvent<HTMLInputElement>, series: Series) => {
    const value = event.target.value
    if (event.target.checked) {
      setFollowedSessions(prevState => ({ ...prevState, [series]: [...prevState[series], value] }))
    } else {
      setFollowedSessions(prevState => ({ ...prevState, [series]: prevState[series].filter(prevSession => prevSession !== value) }))
    }
  }

  return (
    <div className="rounded-lg shadow px-3 py-4 mb-6 text-gray-700">
      {isOpen ? (
        <>
          <div className="mb-4">
            <div className="grid gap-2 mb-3 sm:grid-cols-2">
              {ALL_SERIES.map(({ value: seriesValue, name: seriesName }) => {
                const seriesFollowedSessions = followedSessions[seriesValue]
                return (
                  <Disclosure key={seriesValue} defaultOpen={seriesFollowedSessions.length > 0}>
                    {({ open }) => (
                      <div>
                        <DisclosureChevronButton className="w-full" open={open}>
                          <h2 className="text-black">{seriesName}</h2>
                        </DisclosureChevronButton>
                        <Disclosure.Panel className="flex items-center space-x-4 mt-1">
                          {sessions.map(({ value: sessionValue, name: sessionName }) => {
                            const id = `${seriesValue}-${sessionValue}`
                            return (
                              <div key={id} className="flex items-center space-x-2">
                                <input
                                  id={id}
                                  type="checkbox"
                                  value={sessionValue}
                                  checked={seriesFollowedSessions.includes(sessionValue)}
                                  onChange={event => onChange(event, seriesValue)}
                                />
                                <label htmlFor={id}>{sessionName}</label>
                              </div>
                            )
                          })}
                        </Disclosure.Panel>
                      </div>
                    )}
                  </Disclosure>
                )
              })}
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
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
              <div>
                <Switch.Group as="div" className="flex justify-between">
                  <Switch.Label>Use 24-hour format</Switch.Label>
                  <Switch
                    className={classNames(`${use24HourFormat ? 'bg-blue-600' : 'bg-gray-200'} inline-flex w-11 p-0.5 rounded-full transition-colors ease-in-out duration-200`)}
                    checked={use24HourFormat}
                    onChange={setUse24HourFormat}
                  >
                    <span
                      className={`${use24HourFormat ? 'translate-x-5' : 'translate-x-0'} h-5 w-5 bg-white rounded-full transform transition ease-in-out duration-200 pointer-events-none`}
                      aria-hidden="true"
                    />
                  </Switch>
                </Switch.Group>
              </div>
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
                <h1>You are following <strong>{getSeriesNames(series => savedFollowedSessions[series.value].length > 0)}</strong></h1>
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