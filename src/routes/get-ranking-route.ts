import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { getRanking } from '../functions/get-ranking'
export const getRankingRoute: FastifyPluginAsyncZod = async app => {
  app.get(
    '/ranking',
    {
      schema: {
        //schema é um objeto que define a estrutura de um objeto JSON. Ele é usado para validar os dados que são enviados para um servidor.
        summary: 'Get ranking', //sumário é uma breve descrição do que a rota faz na documentação
        tags: ['referral'], // tags são usadas para categorizar as rotas na documentação
        response: {
          200: z.object({
            ranking: z.array(
              z.object({
                id: z.string(),
                name: z.string(),
                score: z.number(),
              })
            ),
          }),
        },
      },
    },
    async req => {
      const { rankingWithScore } = await getRanking()
      return { ranking: rankingWithScore }
    }
  )
}
