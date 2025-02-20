import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { getSubscriberRankingPosition } from '../functions/get-subscriber-ranking-position'
export const getSubscriberRankingPositionRoute: FastifyPluginAsyncZod =
  async app => {
    app.get(
      '/subscribers/:subscriberId/ranking/position',
      {
        schema: {
          //schema é um objeto que define a estrutura de um objeto JSON. Ele é usado para validar os dados que são enviados para um servidor.
          summary: 'Get subscriber ranking position', //sumário é uma breve descrição do que a rota faz na documentação
          tags: ['referral'], // tags são usadas para categorizar as rotas na documentação
          params: z.object({
            subscriberId: z.string(),
          }),
          response: {
            200: z.object({
              position: z.number().nullable(),
            }),
          },
        },
      },
      async req => {
        const { subscriberId } = req.params
        const { position } = await getSubscriberRankingPosition({
          subscriberId,
        })
        return { position }
      }
    )
  }
