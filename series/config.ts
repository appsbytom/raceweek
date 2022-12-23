export enum Series {
  F1 = 'f1',
  F2 = 'f2',
  F3 = 'f3',
  FE = 'fe',
  WSeries = 'wseries'
}

export type SeriesMap<T> = { [key in Series]: T }

type SeriesInfo = {
  name: string
  colours: string
}

const SERIES_CONFIG: SeriesMap<SeriesInfo> = {
  [Series.F1]: {
    name: 'F1',
    colours: 'bg-[#e10600]'
  },
  [Series.F2]: {
    name: 'F2',
    colours: 'bg-gradient-to-b from-[#0090D0] to-[#004267]'
  },
  [Series.F3]: {
    name: 'F3',
    colours: 'bg-gradient-to-b from-[#E90300] to-[#666666]'
  },
  [Series.FE]: {
    name: 'FE',
    colours: 'bg-[#14B7ED]'
  },
  [Series.WSeries]: {
    name: 'W Series',
    colours: 'bg-[#440099]'
  }
}

export default SERIES_CONFIG