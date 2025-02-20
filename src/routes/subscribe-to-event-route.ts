import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { subscribeToEvent } from '../functions/subscribe-to-event'
export const subscribeToEventRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/subscriptions',
    {
      schema: {
        //schema é um objeto que define a estrutura de um objeto JSON. Ele é usado para validar os dados que são enviados para um servidor.
        summary: 'Subscribe to an event', //sumário é uma breve descrição do que a rota faz na documentação
        tags: ['subscriptions'], // tags são usadas para categorizar as rotas na documentação
        body: z.object({
          name: z.string(),
          email: z.string().email(),
          referrer: z.string().nullish(),
        }),
        response: {
          201: z.object({
            subscriberId: z.string(),
          }),
        },
      },
    },
    async (req, res) => {
      const { name, email, referrer } = req.body

      const { subscriberId } = await subscribeToEvent({
        name,
        email,
        referrerId: referrer,
      })
      return res.status(201).send({
        subscriberId,
      })
    }
  )
}
