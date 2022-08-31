import { Series } from '@/types/event'
import { Type } from '@/types/session'
import { ALL_SERIES } from '@/utils/series'
import { Disclosure, Switch } from '@headlessui/react'
import classNames from 'classnames'
import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react'
import TimezoneSelect from 'react-timezone-select'
import DisclosureChevronButton from './DisclosureChevronButton'
import { usePreferences } from './PreferencesContext/PreferencesContext'
import Spinner from './Spinner'

const sessions = [
  { value: Type.Practice, name: 'Practice' },
  { value: Type.Qualifying, name: 'Qualifying' },
  { value: Type.Race, name: 'Race' }
]

const EditPreferences = ({ setIsOpen }: { setIsOpen: Dispatch<SetStateAction<boolean>> }) => {
  const { followedSessions: savedFollowedSessions, timezone: savedTimezone, use24HourFormat: savedUse24HourFormat, save: savePref, isSaving } = usePreferences()
  const [followedSessions, setFollowedSessions] = useState(savedFollowedSessions)
  const [timezone, setTimezone] = useState(savedTimezone)
  const [use24HourFormat, setUse24HourFormat] = useState(savedUse24HourFormat)

  const save = async () => {
    await savePref(followedSessions, timezone, use24HourFormat)
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
      <div className="flex gap-2 sm:justify-end">
        <button
          className="w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white font-medium hover:bg-gray-50 sm:w-auto"
          onClick={cancel}
        >
          Cancel
        </button>
        <button
          className="flex items-center justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-emerald-600 font-medium text-white sm:w-auto hover:enabled:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-75"
          onClick={save}
          disabled={isSaving}
        >
          {isSaving && <Spinner className="w-4 h-4 mr-3 border-gray-200" />}
          Save
        </button>
      </div>
    </>
  )
}

export default EditPreferences