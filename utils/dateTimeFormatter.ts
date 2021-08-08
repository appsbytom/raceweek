import dayjs from 'dayjs'

const DATE_FORMAT = 'D MMM';
const DATE_TIME_FORMAT = 'ddd HH:mm';

export const formatToDate = date => dayjs(date).format(DATE_FORMAT)

export const toTimezone = date => dayjs(date).tz('Europe/London')

export const formatToDateTime = date => toTimezone(date).format(DATE_TIME_FORMAT)