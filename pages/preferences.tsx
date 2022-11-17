import EditPreferences from '@/components/EditPreferences';
import MigratePreferences from '@/components/MigratePreferences';
import { usePreferences } from '@/components/PreferencesContext/PreferencesContext';
import { useSession } from 'next-auth/react';

const Preferences = () => {
  const { status } = useSession()
  const { isLoading } = usePreferences()

  if (status === 'loading' || isLoading) {
    return (
      <div className="animate-pulse">
        <div className="h-96 mb-3 rounded-md bg-gray-300 sm:h-80" />
        <div className="rounded-md border border-gray-300 px-3 py-4 mt-3 flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center">
          <div className="flex-1">
            <div className="h-6 mb-1 rounded-md bg-gray-300" />
            <div className="h-12 rounded-md bg-gray-300" />
          </div>
          <div className="h-8 rounded-md bg-gray-200 sm:w-32" />
        </div>
      </div>
    )
  }

  return (
    <>
      <EditPreferences/>
      <MigratePreferences/>
    </>
  );
}

export default Preferences