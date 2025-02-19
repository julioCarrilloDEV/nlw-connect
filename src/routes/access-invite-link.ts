import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { env } from '../env'
import { accessInviteLink } from '../functions/access-invite-link'
export const accessInviteLinkRoute: FastifyPluginAsyncZod = async app => {
  app.get(
    '/invites/:subscriberId',
    {
      schema: {
        //schema é um objeto que define a estrutura de um objeto JSON. Ele é usado para validar os dados que são enviados para um servidor.
        summary: 'Access invite links and redirects user', //sumário é uma breve descrição do que a rota faz na documentação
        tags: ['referral'], // tags são usadas para categorizar as rotas na documentação
        params: z.object({
          subscriberId: z.string(),
        }),
        response: {
          201: z.object({
            subscriberId: z.string(),
          }),
        },
      },
    },
    async (req, res) => {
      const { subscriberId } = req.params
      await accessInviteLink({
        subscriberId,
      })
      const redirectUrl = new URL(env.WEB_URL)

      redirectUrl.searchParams.set('referrer', subscriberId) //searchParams é um objeto que permite manipular os parâmetros de busca de uma URL
      return res.redirect(redirectUrl.toString(), 302)
    }
  )
}
