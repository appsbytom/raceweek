import SERIES_CONFIG, { Series } from '@/series/config'

type Props = {
  date: string
  dateUnits?: string
  name: string
  series: Series
  eventName?: string
}

const Activity = ({ date, dateUnits, series, eventName, name }: Props) => {
  const { name: seriesName, colours } = SERIES_CONFIG[series];

  return (
    <li className="py-2 px-3 flex gap-3 items-center">
      <div className="flex flex-col items-center font-bold w-12">
        <p>{date}</p>
        {dateUnits && <p className="text-xs -mt-1">{dateUnits}</p>}
      </div>
      <div>
        <h2 className="text-sm font-medium">{name}</h2>
        <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
          <div className="flex items-center gap-2">
            <div className={`${colours} size-2 rounded-full `} />
            <p className="font-semibold">{seriesName}</p>
          </div>
          {eventName && (
            <>
              <span>·</span>
              <p>{eventName}</p>
            </>
          )}
        </div>
      </div>
    </li>
  )
}

export default Activity