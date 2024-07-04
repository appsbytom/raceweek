import SERIES_CONFIG, { Series } from '@/series/config'
import { Type } from '@/types/session'
import { NOTIFICATION_KEY, subscribe } from '@/utils/notifications'
import { ALL_SERIES } from '@/utils/series'
import { BellIcon, BellSlashIcon } from '@heroicons/react/24/outline'
import { BellAlertIcon } from '@heroicons/react/24/solid'
import { ChangeEvent, useEffect, useState } from 'react'
import { usePreferences } from './PreferencesContext/PreferencesContext'
import SaveButton from './SaveButton'

const sessions = [
  { value: Type.Practice, name: 'Practice' },
  { value: Type.Qualifying, name: 'Qualifying' },
  { value: Type.Race, name: 'Race' }
]

const FollowedSessions = () => {
  const { followedSessions: savedFollowedSessions, timezone, use24HourFormat, save: savePref, isSaving, notificationPermission, setNotificationPermission } = usePreferences()
  const [followedSessions, setFollowedSessions] = useState(savedFollowedSessions)
  const isNotificationsGranted = notificationPermission === 'granted'

  useEffect(() => {
    setFollowedSessions(savedFollowedSessions)
  }, [savedFollowedSessions])

  const onChange = (event: ChangeEvent<HTMLInputElement>, series: Series) => {
    const value = event.target.value
    if (event.target.checked) {
      setFollowedSessions(prevState => ({ ...prevState, [series]: [...prevState[series], value] }))
    } else {
      setFollowedSessions(prevState => ({ ...prevState, [series]: prevState[series].filter(prevSession => prevSession !== value) }))
    }
  }

  const requestPermission = async () => {
    const perm = await Notification.requestPermission()
    setNotificationPermission(perm)
    if (perm === 'granted') {
      await subscribe(savedFollowedSessions)
      localStorage.setItem(NOTIFICATION_KEY, "")
    }
  }

  const unsubscribe = async () => {
    setNotificationPermission('default')
    await subscribe()
    localStorage.setItem(NOTIFICATION_KEY, 'off')
  }

  const save = async () => {
    await savePref(followedSessions, timezone, use24HourFormat)
  }

  return (
    <>
      <div className="flex items-center gap-2">
        <h2 className="text-lg font-semibold">Followed series'</h2>
        {notificationPermission === 'default' || isNotificationsGranted ? (
          <button onClick={isNotificationsGranted ? unsubscribe : requestPermission} className="bg-gray-100 p-1 rounded-md hover:bg-gray-200">
            {isNotificationsGranted ? <BellAlertIcon className="size-5" /> : <BellIcon className="size-5" />}
          </button>
        ) : <BellSlashIcon className="size-5" />}
      </div>
      <div className="text-xs text-gray-500 mt-1">
        {notificationPermission === 'unsupported' && <p>Your browser does not support notifications</p>}
        {notificationPermission === 'denied' && <p>You have denied notification permissions. Reset your permissions in the browser to choose again</p>}
      </div>
      <div className="divide-y divide-gray-100 my-1">
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
      <SaveButton save={save} isSaving={isSaving} />
    </>
  )
}

export default FollowedSessions
