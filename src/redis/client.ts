import { Redis } from 'ioredis'
import { env } from '../env'

export const redis = new Redis(env.REDIS_URL) //crio uma instância do Redis com a URL do Redis que está definida no arquivo env.ts
