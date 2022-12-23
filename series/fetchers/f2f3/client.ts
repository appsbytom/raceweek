import axios from 'axios'

export const client = apikey => axios.create({ baseURL: 'https://api.formula1.com/v1/f2f3-fom-results', headers: { apikey }})