import { ReactNode } from 'react'
import Footer from '../Footer'
import Nav from '../Nav'

type Props = {
  children: ReactNode
  disclaimer?: string
}

const Layout = ({ children, disclaimer }: Props) => (
  <div className="px-5 pb-6 min-h-screen flex flex-col">
    <Nav />
    <div className="max-w-2xl w-full mx-auto flex flex-col flex-grow justify-between">
      {children}
      {disclaimer && <Footer disclaimer={disclaimer} />}
    </div>
  </div>
)

export default Layout