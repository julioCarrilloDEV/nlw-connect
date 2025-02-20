import { db } from '../drizzle/client'
import { subscriptions } from '../drizzle/tables/subscriptions'
import { redis } from '../redis/client'

interface getSubscriberInviteClicksParams {
  // Interface serve para definir o formato dos parâmetros
  subscriberId: string
}

export async function getSubscriberInviteClicks({
  subscriberId,
}: getSubscriberInviteClicksParams) {
  const count = await redis.hget('referral:access-count', subscriberId)
  return { count: count ? Number.parseInt(count) : 0 }
}
