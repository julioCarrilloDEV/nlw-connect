import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { getSubscriberInvitesCount } from '../functions/get-subscriber-invites-count'
export const getSubscriberInvitesCountRoute: FastifyPluginAsyncZod =
  async app => {
    app.get(
      '/subscribers/:subscriberId/ranking/count',
      {
        schema: {
          //schema é um objeto que define a estrutura de um objeto JSON. Ele é usado para validar os dados que são enviados para um servidor.
          summary: 'Get subscriber invites count', //sumário é uma breve descrição do que a rota faz na documentação
          tags: ['referral'], // tags são usadas para categorizar as rotas na documentação
          params: z.object({
            subscriberId: z.string(),
          }),
          response: {
            200: z.object({
              count: z.number(),
            }),
          },
        },
      },
      async req => {
        const { subscriberId } = req.params
        const { count } = await getSubscriberInvitesCount({ subscriberId })
        return { count }
      }
    )
  }
