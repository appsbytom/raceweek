import { CheckCircleIcon } from '@heroicons/react/20/solid'
import { useState } from 'react'
import Spinner from './Spinner'

const SaveButton = ({ save, isSaving }: { save: () => Promise<void>, isSaving: boolean }) => {
  const [isSaved, setIsSaved] = useState(false);

  const submit = async () => {
    await save()
    setIsSaved(true)

    setTimeout(() => setIsSaved(false), 1000)
  }

  return (
    <div className="flex sm:justify-end">
      <button
        className="flex items-center justify-center w-full rounded-md border border-transparent shadow-sm px-3 py-2 bg-emerald-600 font-semibold text-sm text-white sm:w-auto hover:enabled:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-75"
        onClick={submit}
        disabled={isSaving}
      >
        {isSaving && <Spinner className="size-4 mr-2 border-gray-200" />}
        {isSaved ? (
          <>
            <CheckCircleIcon className="size-5 mr-1" />
            Saved
          </>
        ) : 'Save'}
      </button>
    </div>
  );
}
 
export default SaveButton;