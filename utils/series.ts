import { Series } from '@/types/event'

type NamedSeries = {
  value: Series
  name: string
}

export const ALL_SERIES: NamedSeries[] = [
  { value: Series.F1, name: 'F1' },
  { value: Series.F2, name: 'F2' },
  { value: Series.F3, name: 'F3' },
  { value: Series.FE, name: 'FE' },
  { value: Series.WSeries, name: 'W Series' }
]

export const getSeriesNames = (condition: (series: NamedSeries) => boolean) => ALL_SERIES.filter(condition).map(series => series.name).join(', ')