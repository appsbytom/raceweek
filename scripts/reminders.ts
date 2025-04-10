import { messaging } from '@/lib/firebase-admin'
import prisma from '@/lib/prisma'
import dayjs from 'dayjs'

(async () => {
  const now = dayjs()
  try {
    const reminders = await prisma.sessionReminder.findMany({
      where: {
        scheduledFor: {
          lte: now.unix(),
          gte: now.subtract(5, 'minutes').unix()
        }
      }
    })

    if (reminders.length === 0) {
      console.log('No reminders to send')
      return
    }
    await Promise.all([
      messaging.sendEach(reminders.map(reminder => ({
        notification: { title: reminder.title, body: reminder.body },
        topic: reminder.topic,
        webpush: {
          headers: {
            Urgency: 'high',
            TTL: '300'
          }
        }
      }))),
      prisma.sessionReminder.deleteMany({ where: { id: { in: reminders.map(reminder => reminder.id) } } })
    ])
    console.log('Reminders sent')
  } catch (e) {
    console.error(`Failed to send reminders: ${e}`)
  }
})()