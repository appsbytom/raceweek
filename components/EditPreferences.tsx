import { getFCMToken } from '@/lib/firebase'
import { Series } from '@/series/config'
import { Type } from '@/types/session'
import { ALL_SERIES } from '@/utils/series'
import { Switch } from '@headlessui/react'
import * as Accordion from '@radix-ui/react-accordion'
import classNames from 'classnames'
import { ChangeEvent, useEffect, useState } from 'react'
import TimezoneSelect from 'react-timezone-select'
import AccordionChevronTrigger from './AccordionChevronTrigger'
import { usePreferences } from './PreferencesContext/PreferencesContext'
import Spinner from './Spinner'

const sessions = [
  { value: Type.Practice, name: 'Practice' },
  { value: Type.Qualifying, name: 'Qualifying' },
  { value: Type.Race, name: 'Race' }
]

const EditPreferences = () => {
  const { followedSessions: savedFollowedSessions, timezone: savedTimezone, use24HourFormat: savedUse24HourFormat, save: savePref, isSaving } = usePreferences()
  const [followedSessions, setFollowedSessions] = useState(savedFollowedSessions)
  const [timezone, setTimezone] = useState(savedTimezone)
  const [use24HourFormat, setUse24HourFormat] = useState(savedUse24HourFormat)
  const [expandedSeries, setExpandedSeries] = useState([])
  const [isSaved, setIsSaved] = useState(false)
  const [permission, setPermission] = useState<'unsupported' | NotificationPermission>(() => {
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
    setExpandedSeries(Object.entries(savedFollowedSessions).filter(([_, value]) => value.length > 0).map(([key]) => key))
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
        <Accordion.Root className="grid gap-2 mb-3 sm:grid-cols-2" type="multiple" value={expandedSeries} onValueChange={setExpandedSeries}>
          {ALL_SERIES.map(({ value: seriesValue, name: seriesName }) => {
            const seriesFollowedSessions = followedSessions[seriesValue]
            return (
              <Accordion.Item key={seriesValue} value={seriesValue}>
                <AccordionChevronTrigger className="w-full">
                  <h2 className="text-black">{seriesName}</h2>
                </AccordionChevronTrigger>
                <Accordion.Content className="flex items-center space-x-4 mt-1 px-3">
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
                </Accordion.Content>
              </Accordion.Item>
            )
          })}
        </Accordion.Root>
        <div className="grid gap-3 px-3 sm:grid-cols-2">
          <div>
            <label htmlFor="timezoneSelect" className="block mb-2">Timezone</label>
            <TimezoneSelect
              inputId="timezoneSelect"
              value={timezone}
              onChange={selectedTimezone => setTimezone(typeof selectedTimezone === 'string' ? selectedTimezone : selectedTimezone.value)}
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
      <div className="flex px-3 sm:justify-end">
        <button
          className="flex items-center justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-emerald-600 font-medium text-white sm:w-auto hover:enabled:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-75"
          onClick={save}
          disabled={isSaving}
        >
          {isSaving && <Spinner className="w-4 h-4 mr-3 border-gray-200" />}
          {isSaved ? 'Saved!' : 'Save'}
        </button>
      </div>
      <div className="px-3">
        <div className="flex flex-col gap-3 p-4 mt-5 border border-gray-300 rounded-md sm:flex-row sm:justify-between sm:items-center">
          <div>
            <h2 className="text-lg font-semibold">Push Notifications</h2>
            {permission === 'unsupported' && <p>Your browser does not support this feature</p>}
            {permission === 'denied' && <p>You have denied permissions. Reset your permissions in the browser to choose again</p>}
            {permission === 'default' && <p>Opt-in to receive a notification reminder <strong>5 minutes</strong> before the sessions you follow start</p>}
            {permission === 'granted' && <p>You will receive a notification reminder <strong>5 minutes</strong> before the sessions you follow start</p>}
          </div>
          {permission === 'default' && <button className="py-2 px-4 rounded-md border border-gray-300 font-medium" onClick={requestPermission}>Allow Notifications</button>}
        </div>
      </div>
    </>
  )
}

export default EditPreferences