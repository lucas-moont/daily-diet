import { FastifyReply, FastifyRequest } from 'fastify'
import { ResourceNotFoundError } from '@/use-cases/errors/resouce-not-found-error'
import { makeGetProfile } from '@/use-cases/factories/make-get-profile'

export async function profile(req: FastifyRequest, res: FastifyReply) {
  const userId = req.user.sub

  try {
    const getUserProfileInfo = makeGetProfile()
    const { user } = await getUserProfileInfo.execute({
      userId,
    })
    res.status(200).send({ user: { ...user, password_hash: undefined } })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      res.status(404).send({
        message: err.message,
      })
    }
  }
}
