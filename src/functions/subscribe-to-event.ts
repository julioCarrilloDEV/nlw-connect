import { db } from '../drizzle/client'
import { subscriptions } from '../drizzle/tables/subscriptions'

interface subscribeToEventParams {
  // Interface serve para definir o formato dos parâmetros
  name: string
  email: string
}

export async function subscribeToEvent({
  name,
  email,
}: subscribeToEventParams) {
  const result = await db
    .insert(subscriptions)
    .values({
      name,
      email,
    })
    .returning()

  const subscriber = result[0]

  return {
    subscriberId: subscriber.id,
  }
}
