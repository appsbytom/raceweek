import { FOLLOWED_SESSIONS_KEY, getLocalPreferences, TIMEZONE_KEY, USE_24_HOUR_FORMAT_KEY } from '@/utils/preferences'
import { Dialog } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { signIn, useSession } from 'next-auth/react'
import { Dispatch, SetStateAction, useState } from 'react'
import { usePreferences } from './PreferencesContext/PreferencesContext'
import Spinner from './Spinner'

const MigratePreferencesModal = ({ setIsOpen, isOpen }: { setIsOpen: Dispatch<SetStateAction<boolean>>, isOpen: boolean }) => {
  const { save, isSaving } = usePreferences()

  const transfer = async () => {
    const { followedSessions, timezone, use24HourFormat } = getLocalPreferences()

    await save(followedSessions, timezone, use24HourFormat)

    localStorage.removeItem(FOLLOWED_SESSIONS_KEY)
    localStorage.removeItem(TIMEZONE_KEY)
    localStorage.removeItem(USE_24_HOUR_FORMAT_KEY)
    setIsOpen(false)
  }

  return (
    <Dialog as="div" className="relative z-10" open={isOpen} onClose={() => setIsOpen(false)}>
      <div className="fixed inset-0 bg-black bg-opacity-25" />

      <div className="fixed inset-0">
        <div className="flex h-3/4 items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
            <div className="flex flex-col gap-4 sm:flex-row">
              <div className="h-12 w-12 rounded-full bg-red-100 mx-auto flex shrink-0 justify-center items-center">
                <ExclamationTriangleIcon className="h-6 text-red-600" />
              </div>
              <div className="text-center sm:text-left">
                <Dialog.Title as="h3" className="font-medium">
                  Migrate your preferences
                </Dialog.Title>
                <p className="text-sm text-gray-500 mt-2">
                  Are you sure you want to migrate your preferences? This will override any pre-existing migrations and delete un-migrated preferences
                </p>
              </div>
            </div>

            <div className="mt-4 flex gap-2 sm:justify-end">
              <button
                className="w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-semibold hover:bg-gray-50 sm:w-auto"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </button>
              <button
                className="w-full flex items-center justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-sm font-semibold text-white bg-red-600 sm:w-auto hover:enabled:bg-red-700 disabled:cursor-not-allowed disabled:opacity-75"
                onClick={transfer}
                disabled={isSaving}
              >
                {isSaving && <Spinner className="w-4 h-4 mr-3 border-gray-200" />}
                Yes, migrate
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  )
}

const MigratePreferences = () => {
  const { data } = useSession()
  const { isLinkedToAccount } = usePreferences()
  const [isOpen, setIsOpen] = useState(false)

  const getMessage = () => {
    if (data) {
      if (isLinkedToAccount) {
        return 'Your preferences and account are linked and will be used across any device logged in to this account'
      } else {
        return 'Your preferences are not linked to your account, migrate or update them manually'
      }
    }

    return 'Share your preferences between devices and keep up to date wherever you are'
  }

  return (
    <>
      <MigratePreferencesModal isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className="rounded-md border border-red-300 p-4 mt-5 flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center">
        <div>
          <h3 className="font-semibold">Migrate your preferences</h3>
          <p className="text-gray-500 text-sm mt-1">{getMessage()}</p>
        </div>
        {data ? (
          <button
            className="w-full rounded-md border border-transparent shadow-sm px-4 py-2 font-semibold text-sm text-white bg-red-600 hover:bg-red-700 sm:w-auto"
            onClick={() => setIsOpen(true)}
          >
            Migrate
          </button>
        ) : (
          <button
            className="flex items-center justify-center shrink-0 w-full rounded-md border border-transparent shadow-sm px-4 py-2 font-semibold text-sm text-white bg-[#4285F4] hover:bg-[#4285F4]/90 sm:w-auto"
            onClick={() => signIn('google')}
          >
            <svg className="mr-2 -ml-1 w-4 h-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" /></svg>
            Login with Google
          </button>
        )}
      </div>
    </>
  )
}

export default MigratePreferences