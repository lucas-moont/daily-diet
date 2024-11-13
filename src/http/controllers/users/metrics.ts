import { FastifyRequest, FastifyReply } from 'fastify'
import { makeFetchUserMetrics } from '@/use-cases/factories/make-fetch-user-metrics'
import { ResourceNotFoundError } from '@/use-cases/errors/resouce-not-found-error'

export async function metrics(req: FastifyRequest, reply: FastifyReply) {
  req.jwtVerify()
  const fetchUserMetrics = makeFetchUserMetrics()

  try {
    const { metrics } = await fetchUserMetrics.execute({
      userId: req.user.sub,
    })

    reply.status(200).send({
      metrics,
    })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      reply.status(404).send({
        message: err.message,
      })
    }
  }
}
