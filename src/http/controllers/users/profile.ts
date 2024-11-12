import { z } from 'zod'
import { makeGetLongestStreak } from '@/use-cases/factories/make-get-longest-streak'
import { FastifyReply, FastifyRequest } from 'fastify'
import { ResourceNotFoundError } from '@/use-cases/errors/resouce-not-found-error'

export async function getProfileInfo(req: FastifyRequest, res: FastifyReply) {
  const GetLongestStreakSchema = z.object({
    userId: z.string(),
  })

  const { userId } = GetLongestStreakSchema.parse(req.params)

  try {
    const getLongestStreak = makeGetLongestStreak()
    const { record } = await getLongestStreak.execute({ userId })
    res.status(200).send({ record })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      res.status(404).send({
        message: err.message,
      })
    }
  }
}
