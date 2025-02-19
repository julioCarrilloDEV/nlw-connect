import { db } from '../drizzle/client'
import { subscriptions } from '../drizzle/tables/subscriptions'
import { redis } from '../redis/client'

interface accessInviteLinkParams {
  // Interface serve para definir o formato dos parâmetros
  subscriberId: string
}

export async function accessInviteLink({
  subscriberId,
}: accessInviteLinkParams) {
  await redis.hincrby('referral:access-count', subscriberId, 1)
}
