import { Switch } from '@headlessui/react'
import classNames from 'classnames'
import { useEffect, useState } from 'react'
import TimezoneSelect from 'react-timezone-select'
import { usePreferences } from './PreferencesContext/PreferencesContext'
import SaveButton from './SaveButton'

const TimePlace = () => {
  const { followedSessions, timezone: savedTimezone, use24HourFormat: savedUse24HourFormat, save: savePref, isSaving } = usePreferences()
  const [timezone, setTimezone] = useState(savedTimezone)
  const [use24HourFormat, setUse24HourFormat] = useState(savedUse24HourFormat)

  useEffect(() => {
    setTimezone(savedTimezone)
    setUse24HourFormat(savedUse24HourFormat)
  }, [savedTimezone, savedUse24HourFormat])

  const save = async () => {
    await savePref(followedSessions, timezone, use24HourFormat)
  }

  return (
    <>
      <div className="mb-3">
        <h2 className="text-lg font-semibold mt-4">Time and place</h2>
        <div className="grid gap-3 mt-3">
          <div>
            <label htmlFor="timezoneSelect" className="block mb-1 text-sm font-medium">Timezone</label>
            <TimezoneSelect
              inputId="timezoneSelect"
              value={timezone}
              onChange={selectedTimezone => setTimezone(typeof selectedTimezone === 'string' ? selectedTimezone : selectedTimezone.value)}
              className="text-sm"
              styles={{
                menuList: (provided) => ({ ...provided, paddingTop: 0, paddingBottom: 0 }),
              }}
            />
          </div>
          <div>
            <Switch.Group as="div" className="flex justify-between items-center">
              <Switch.Label className="text-sm font-medium">Use 24-hour format</Switch.Label>
              <Switch
                className={classNames(`${use24HourFormat ? 'bg-blue-600' : 'bg-gray-200'} inline-flex w-8 p-0.5 rounded-full transition-colors ease-in-out duration-200`)}
                checked={use24HourFormat}
                onChange={setUse24HourFormat}
              >
                <span
                  className={`${use24HourFormat ? 'translate-x-3' : 'translate-x-0'} size-4 bg-white rounded-full transform transition ease-in-out duration-200 pointer-events-none`}
                  aria-hidden="true"
                />
              </Switch>
            </Switch.Group>
          </div>
        </div>
      </div>
      <SaveButton save={save} isSaving={isSaving} />
    </>
  )
}

export default TimePlace