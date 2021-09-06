import { Series, Type } from '@/types/event'
import { ChangeEvent, useState } from 'react'
import { usePreferences } from './PreferencesContext/PreferencesContext'

type Props = {
  series: Series
}

const sessionTypes = [
  { name: 'Practice', value: Type.Practice },
  { name: 'Qualifying', value: Type.Qualifying },
  { name: 'Race', value: Type.Race }
]

const FollowedSessions = ({ series }: Props) => {
  const { followedSessions: { [series]: seriesFollowedSessions }, dispatch } = usePreferences()
  const [followedSessions, setFollowedSessions] = useState(seriesFollowedSessions)
  const [isOpen, setIsOpen] = useState(false)

  const save = () => {
    dispatch({ type: 'SET_FOLLOWED_SESSIONS', payload: { series, followedSessions } })
    setIsOpen(false)
  }

  const cancel = () => {
    setFollowedSessions(seriesFollowedSessions)
    setIsOpen(false)
  }

  const onChange = (event: ChangeEvent<HTMLInputElement>, session: string) => {
    if (event.target.checked) {
      setFollowedSessions(prevState => [...prevState, session])
    } else {
      setFollowedSessions(prevState => prevState.filter(prevSession => prevSession !== session))
    }
  }

  return (
    <div className="bg-white rounded-lg shadow px-5 py-4 mb-6 text-center text-gray-700 sm:text-left">
      {isOpen ? (
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="flex justify-center items-center space-x-4 mb-4 sm:mb-0">
            {sessionTypes.map(sessionType => (
              <div key={sessionType.name} className="flex items-center space-x-2">
                <input
                  id={sessionType.value}
                  type="checkbox"
                  checked={followedSessions.includes(sessionType.value)}
                  onChange={(event) => onChange(event, sessionType.value)}
                />
                <label htmlFor={sessionType.value}>{sessionType.name}</label>
              </div>
            ))}
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
        </div>
      ) : (
        <div className="sm:flex sm:justify-between sm:items-center">
          <div className="mb-3 sm:mb-0 sm:w-2/3">
            {seriesFollowedSessions.length > 0 ? (
              <p>You are following <strong>{sessionTypes.filter(session => seriesFollowedSessions.includes(session.value)).map(value => value.name).join(', ')}</strong></p>
            ) : (
              <p>You are not following any sessions</p>
            )}
          </div>
          <button
            className="w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white font-medium hover:bg-gray-50 sm:w-auto"
            onClick={() => setIsOpen(true)}
          >
            Choose sessions
          </button>
        </div>
      )}
    </div>
  )
}

export default FollowedSessions