import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'

const PreferencesLink = () => (
  <Link href="/preferences" className="hover:underline">
    Preferences
  </Link>
)

const NavProfile = () => {
  const { status } = useSession()

  if (status === 'loading') {
    return <div className="animate-pulse bg-gray-300 rounded-md self-stretch w-40" />
  }

  if (status === 'unauthenticated') {
    return <PreferencesLink />
  }

  return (
    <div className="flex gap-3">
      <PreferencesLink />
      <button className="hover:underline" onClick={() => signOut()}>Logout</button>
    </div>
  )
}

const Nav = () => (
  <nav className="px-4 py-3 border-b">
    <div className="flex justify-between items-center max-w-2xl mx-auto">
      <Link href="/" className="text-xl">
        raceweek
      </Link>
      <NavProfile />
    </div>
  </nav>
)

export default Nav