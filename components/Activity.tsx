import { Series } from '@/types/event'
import { ReactNode } from 'react'

type Props = {
  series: Series
  children: ReactNode
}

const SERIES_COLOUR = {
  [Series.F1]: 'bg-f1',
  [Series.F2]: 'bg-gradient-to-b from-f2 to-f2-accent',
  [Series.F3]: 'bg-gradient-to-b from-f3 to-f3-accent',
  [Series.FE]: 'bg-fe',
  [Series.WSeries]: 'bg-wseries'
}

const Activity = ({ series, children }: Props) => (
  <li className="border-b last:border-b-0 flex">
    <div className={`w-3 ${SERIES_COLOUR[series]}`} />
    <div className="py-2 px-4 flex flex-1 items-center space-x-2">
      {children}
    </div>
  </li>
)

export default Activity