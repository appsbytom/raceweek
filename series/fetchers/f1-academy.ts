import { getSeriesEvents } from '@/lib/formula1/formula1'
import { Series } from '../config'

export default () => getSeriesEvents(Series.F1Academy)