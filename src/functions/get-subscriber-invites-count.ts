import { db } from '../drizzle/client'
import { subscriptions } from '../drizzle/tables/subscriptions'
import { redis } from '../redis/client'

interface getSubscriberInvitesCountParams {
  // Interface serve para definir o formato dos parâmetros
  subscriberId: string
}

export async function getSubscriberInvitesCount({
  subscriberId,
}: getSubscriberInvitesCountParams) {
  const count = await redis.zscore('referral:ranking', subscriberId)
  return { count: count ? Number.parseInt(count) : 0 }
}
