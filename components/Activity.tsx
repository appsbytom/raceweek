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
        <p className="text-lg">{date}</p>
        {dateUnits && <p className="text-sm -mt-1.5">{dateUnits}</p>}
      </div>
      <div>
        <h2>{name}</h2>
        <div className="flex items-center gap-2 mt-1">
          <div className="flex items-center gap-2">
            <div className={`${colours} h-2 w-2 rounded-full `} />
            <p className="font-bold text-sm">{seriesName}</p>
          </div>
          {eventName && (
            <>
              <span className="text-gray-600">·</span>
              <p className="text-gray-600 text-sm">{eventName}</p>
            </>
          )}
        </div>
      </div>
    </li>
  )
}

export default Activity