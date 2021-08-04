import dayjs from 'dayjs'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'

dayjs.extend(isSameOrAfter)
dayjs.extend(timezone)
dayjs.extend(utc)

const DATE_FORMAT = 'D MMM';
const TIME_FORMAT = 'ddd HH:mm';

export const formatToDate = date => dayjs(date).format(DATE_FORMAT)

export const formatToTimeWithTimezone = date => dayjs(date).tz('Europe/London').format(TIME_FORMAT)