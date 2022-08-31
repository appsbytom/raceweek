import { getSeriesNames } from '@/utils/series'
import { useState } from 'react'
import EditPreferences from './EditPreferences'
import { usePreferences } from './PreferencesContext/PreferencesContext'

const Preferences = () => {
  const { followedSessions, isFollowingSessions, timezone } = usePreferences()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="rounded-lg shadow px-3 py-4 mb-6 text-gray-700">
      {isOpen ? <EditPreferences setIsOpen={setIsOpen} /> : (
        <div className="sm:flex sm:justify-between sm:items-center">
          <div className="mb-3 text-center sm:text-left sm:mb-0">
            {isFollowingSessions ? (
              <>
                <h1>You are following <strong>{getSeriesNames(series => followedSessions[series.value].length > 0)}</strong></h1>
                <h2>Your timezone is {timezone}</h2>
              </>
            ) : (
              <>
                <h1 className="font-semibold">You are not following any series</h1>
                <h2 className="text-gray-700">Expand the series' you are interested in and select the sessions you wish to follow</h2>
              </>
            )}
          </div>
          <button
            className="w-full shrink-0 rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white font-medium hover:bg-gray-50 sm:w-auto sm:ml-4"
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