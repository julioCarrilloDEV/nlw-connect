import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
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
        }),
        response: {
          201: z.object({
            name: z.string(),
            email: z.string().email(),
          }),
        },
      },
    },
    async (req, res) => {
      const { name, email } = req.body

      return res.status(201).send({
        name,
        email,
      })
    }
  )
}
