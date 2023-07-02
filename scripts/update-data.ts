import prisma from '@/lib/prisma'
import axios from 'axios'

const CONSOLE_WRAPPER = '---------- UPDATE DATA ----------'
const DUMMY = 'dummy'

const main = async () => {
  console.log(CONSOLE_WRAPPER)
  await prisma.event.create({ data: { id: DUMMY, name: DUMMY, series: DUMMY, raceDate: '1970-01-01T00:00:00.000Z' }})

  await prisma.event.delete({ where: { id: DUMMY }})

  try {
    await axios.get(`${process.env.APP_URL}/api/revalidate`, { headers: { token: process.env.TOKEN }})
    console.log('Revalidated!')
  } catch (e) {
    console.log('Failed to revalidate:', e.response.data.message)
  }

  console.log(CONSOLE_WRAPPER)
}

main()
  .catch(reason => {
    console.error(reason)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })