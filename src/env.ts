import { z } from 'zod'

const envSchema = z.object({
  PORT: z.coerce.number().default(3334),
  POSTGRES_URL: z.string().url(),
  REDIS_URL: z.string().url(),
  WEB_URL: z.string().url(),
})

export const env = envSchema.parse(process.env) //parse é um método que valida e transforma um objeto JSON em um objeto TypeScript. Ele é usado para garantir que os dados que são enviados para um servidor são válidos.
