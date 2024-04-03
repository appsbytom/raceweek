import axios from 'axios'

(async () => {
  try {
    await axios.get(`${process.env.APP_URL}/api/revalidate`, { headers: { token: process.env.TOKEN } })
    console.log('Revalidated!')
  } catch (e) {
    throw new Error(`Failed to revalidate: ${e.response.data.message}`)
  }
})()