import SERIES_CONFIG, { Series } from '@/series/config'

type NamedSeries = {
  value: Series
  name: string
}

type SeriesType = typeof SERIES_CONFIG

export const ALL_SERIES: NamedSeries[] = (Object.entries(SERIES_CONFIG) as Array<[keyof SeriesType, SeriesType[keyof SeriesType]]>)
  .map(([key, value]) => ({ value: key, name: value.name }))

export const getSeriesNames = (condition: (series: NamedSeries) => boolean) => ALL_SERIES.filter(condition).map(series => series.name).join(', ')