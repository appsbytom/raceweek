import { client } from './client'
import { RacesResponse } from './types'
import { mapResponseToData } from './mapper'

const f3Client = client(process.env.F3_KEY)
const RACES_ENDPOINT = `/races?website=f3`

export const getRaces = async () => {
  const { data } = await f3Client.get<RacesResponse>(RACES_ENDPOINT)

  return mapResponseToData(data)
}