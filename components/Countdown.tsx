import SERIES_CONFIG, { Series } from '@/series/config'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import { useEffect, useState } from 'react'

dayjs.extend(duration)

const MILLISECONDS_IN_DAY = 8.64e+7

type Props = {
  startTime: string
  series: Series
}

const Countdown = ({ startTime, series }: Props) => {
  const [countdown, setCountdown] = useState(dayjs(startTime).diff(dayjs()))

  useEffect(() => {
    const timer = setInterval(() => setCountdown(dayjs(startTime).diff(dayjs())), 1000)

    return () => {
      clearInterval(timer)
    }
  }, [startTime])

  if (countdown <= 0) {
    return (
      <div className="flex items-center gap-2">
        <h2 className="font-bold">LIVE</h2>
        <div className="relative size-2">
          <div className={`animate-ping absolute h-full w-full rounded-full ${SERIES_CONFIG[series].colours}`} />
          <div className={`relative rounded-full h-full ${SERIES_CONFIG[series].colours}`} />
        </div>
      </div>
    )
  }

  const duration = dayjs.duration(countdown)

  let time
  if (countdown > MILLISECONDS_IN_DAY) {
    time = <span className="text-base font-bold">{duration.humanize()}</span>
  } else {
    const hours = duration.hours()
    const minutes = Math.ceil(hours > 0 ? duration.minutes() : duration.asMinutes())
    time = <span className="text-base font-bold">{hours > 0 && <span>{hours}<span className="text-xs">HR</span></span>} {minutes}<span className="text-xs">MIN</span></span>
  }

  return <h2 className="text-sm">Starts in {time}</h2>
}

export default Countdown