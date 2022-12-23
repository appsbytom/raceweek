import SERIES_CONFIG, { Series } from '@/series/config'
import { ReactNode } from 'react'

type Props = {
  series: Series
  children: ReactNode
}

const Activity = ({ series, children }: Props) => (
  <li className="border-b last:border-b-0 flex">
    <div className={`w-3 ${SERIES_CONFIG[series].colours}`} />
    <div className="py-2 px-4 flex flex-1 items-center space-x-2">
      {children}
    </div>
  </li>
)

export default Activity