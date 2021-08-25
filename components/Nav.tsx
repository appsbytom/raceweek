import Link from 'next/link'
import TimezoneSelect from 'react-timezone-select'
import { usePreferences } from './PreferencesContext/PreferencesContext'

const NavLink = ({ text, href }: { text: string, href: string }) => (
  <Link href={href}>
    <a className="hover:underline">{text}</a>
  </Link>
)

const Nav = () => {
  const { dispatch, timezone } = usePreferences()

  return (
    <header className="max-w-3xl w-full pt-8 pb-6 mx-auto text-gray-700 sm:flex sm:justify-between sm:items-center">
      <nav className="space-x-4 text-center mb-4 sm:mb-0">
        <NavLink href="/" text="Home" />
        <NavLink href="/f1" text="F1" />
        <NavLink href="/f2" text="F2" />
        <NavLink href="/f3" text="F3" />
        <NavLink href="/fe" text="FE" />
        <NavLink href="/wseries" text="W Series" />
      </nav>
      <div className="sm:w-2/5">
        <TimezoneSelect
          value={timezone}
          onChange={({ value }) => dispatch({ type: 'SET_TIMEZONE', payload: value })}
          styles={{
            menuList: (provided) => ({ ...provided, paddingTop: 0, paddingBottom: 0 }),
            valueContainer: (provided) => ({ ...provided, marginRight: 4 })
          }}
        />
      </div>
    </header>
  )
}

export default Nav