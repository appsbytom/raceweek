import { getFCMToken } from '@/lib/firebase'
import SERIES_CONFIG, { Series } from '@/series/config'
import { Type } from '@/types/session'
import { ALL_SERIES } from '@/utils/series'
import { Switch } from '@headlessui/react'
import { BellIcon, BellSlashIcon } from '@heroicons/react/24/outline'
import { BellAlertIcon } from '@heroicons/react/24/solid'
import classNames from 'classnames'
import { ChangeEvent, useEffect, useState } from 'react'
import TimezoneSelect from 'react-timezone-select'
import { usePreferences } from './PreferencesContext/PreferencesContext'
import Spinner from './Spinner'

const sessions = [
  { value: Type.Practice, name: 'Practice' },
  { value: Type.Qualifying, name: 'Qualifying' },
  { value: Type.Race, name: 'Race' }
]

type NotificationStatus = 'unsupported' | NotificationPermission

const NotificationBell = ({ permission, requestPermission }: { permission: NotificationStatus, requestPermission: () => void }) => {
  if (permission === 'granted') {
    // unsubscribe from all topics
    return (
      <button onClick={() => console.log('unsub')} className="bg-gray-100 p-1 rounded-md hover:bg-gray-200">
        <BellAlertIcon className="size-5" />
      </button>
    )
  }

  if (permission === 'default') {
    return (
      <button onClick={requestPermission} className="bg-gray-100 rounded-md p-1 hover:bg-gray-200">
        <BellIcon className="size-5" />
      </button>
    )
  }

  return <BellSlashIcon className="size-5" />
}

const EditPreferences = () => {
  const { followedSessions: savedFollowedSessions, timezone: savedTimezone, use24HourFormat: savedUse24HourFormat, save: savePref, isSaving } = usePreferences()
  const [followedSessions, setFollowedSessions] = useState(savedFollowedSessions)
  const [timezone, setTimezone] = useState(savedTimezone)
  const [use24HourFormat, setUse24HourFormat] = useState(savedUse24HourFormat)
  const [isSaved, setIsSaved] = useState(false)
  const [permission, setPermission] = useState<NotificationStatus>(() => {
    if (!('Notification' in window)) {
      return 'unsupported'
    }
    return Notification.permission
  })

  useEffect(() => {
    setTimezone(savedTimezone)
    setUse24HourFormat(savedUse24HourFormat)
  }, [savedTimezone, savedUse24HourFormat])

  useEffect(() => {
    setFollowedSessions(savedFollowedSessions)
  }, [savedFollowedSessions])

  const subscribe = async () => {
    const token = await getFCMToken()
    await fetch('/api/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        token,
        topics: Object.entries(followedSessions).flatMap(([key, value]) => value.flatMap(v => `${key}-${v}`))
      })
    })
  }

  const save = async () => {
    await savePref(followedSessions, timezone, use24HourFormat)
    if (permission === 'granted') {
      await subscribe()
    }
    setIsSaved(true)

    setTimeout(() => setIsSaved(false), 1000)
  }

  const onChange = (event: ChangeEvent<HTMLInputElement>, series: Series) => {
    const value = event.target.value
    if (event.target.checked) {
      setFollowedSessions(prevState => ({ ...prevState, [series]: [...prevState[series], value] }))
    } else {
      setFollowedSessions(prevState => ({ ...prevState, [series]: prevState[series].filter(prevSession => prevSession !== value) }))
    }
  }

  const requestPermission = async () => {
    const permission = await Notification.requestPermission()
    setPermission(permission)
    if (permission === 'granted') {
      await subscribe()
    }
  }

  return (
    <>
      <div className="mb-4">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold">Followed series'</h2>
          <NotificationBell permission={permission} requestPermission={requestPermission} />
        </div>
        <div className="text-xs text-gray-500 mt-1">
          {permission === 'unsupported' && <p>Your browser does not support notifications</p>}
          {permission === 'denied' && <p>You have denied notification permissions. Reset your permissions in the browser to choose again</p>}
        </div>
        <div className="divide-y divide-gray-100 mt-1">
          {ALL_SERIES.map(({ value: seriesValue, name: seriesName }) => {
            const seriesFollowedSessions = followedSessions[seriesValue]
            return (
              <div key={seriesValue} className="flex flex-col py-2 md:flex-row">
                <div className="flex items-center gap-2 md:w-1/2">
                  <div className={`${SERIES_CONFIG[seriesValue].colours} size-2 rounded-full`} />
                  <h2 className="text-sm font-medium">{seriesName}</h2>
                </div>
                <div className="flex mt-1 md:w-full">
                  {sessions.map(({ value: sessionValue, name: sessionName }) => {
                    const id = `${seriesValue}-${sessionValue}`
                    return (
                      <label key={id} htmlFor={id} className="flex items-center space-x-2 justify-center grow px-2 py-1 text-sm font-medium text-gray-700">
                        <input
                          id={id}
                          type="checkbox"
                          className="form-checkbox rounded border-gray-300"
                          value={sessionValue}
                          checked={seriesFollowedSessions.includes(sessionValue)}
                          onChange={event => onChange(event, seriesValue)}
                        />
                        <span>{sessionName}</span>
                      </label>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
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
      <div className="flex sm:justify-end">
        <button
          className="flex items-center justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-emerald-600 font-semibold text-sm text-white sm:w-auto hover:enabled:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-75"
          onClick={save}
          disabled={isSaving}
        >
          {isSaving && <Spinner className="w-4 h-4 mr-3 border-gray-200" />}
          {isSaved ? 'Saved!' : 'Save'}
        </button>
      </div>
    </>
  )
}

export default EditPreferences