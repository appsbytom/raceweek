import Link from 'next/link'

const NavLink = ({ text, href }: { text: string, href: string }) => (
  <Link href={href}>
    <a className="hover:underline">{text}</a>
  </Link>
)

const Nav = () => (
  <nav className="max-w-3xl p-8 mx-auto space-x-4 text-center text-gray-700">
    <NavLink href="/" text="Home" />
    <NavLink href="/f1" text="F1" />
    <NavLink href="/f2" text="F2" />
    <NavLink href="/f3" text="F3" />
    <NavLink href="/fe" text="FE" />
    <NavLink href="/wseries" text="W Series" />
  </nav>
)

export default Nav