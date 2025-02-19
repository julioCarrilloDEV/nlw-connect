import { drizzle } from 'drizzle-orm/postgres-js' //importo o Drizzle ORM
import postgres from 'postgres'
import { env } from '../env'
import { subscriptions } from './tables/subscriptions' //importo o arquivo subscriptions.ts que contém a definição da tabela subscriptions

export const pg = postgres(env.POSTGRES_URL) //crio uma instância do PostgreSQL com as variáveis de ambiente que estão definidas no arquivo .env
export const db = drizzle(pg, {
  schema: {
    subscriptions, //defino a tabela subscriptions no esquema do Drizzle ORM
  },
}) //crio uma instância do Drizzle ORM com a instância do PostgreSQL
