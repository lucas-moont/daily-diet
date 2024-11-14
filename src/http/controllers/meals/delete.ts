import { ResourceNotFoundError } from '@/use-cases/errors/resouce-not-found-error'
import { makeDeleteMealUseCase } from '@/use-cases/factories/make-delete-meal'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function deleteMeal(req: FastifyRequest, reply: FastifyReply) {
  const deleteMealSchema = z.object({
    mealId: z.string(),
  })

  try {
    const { mealId } = deleteMealSchema.parse(req.params)
    const userId = req.user.sub
    const deleteMealUseCase = makeDeleteMealUseCase()

    await deleteMealUseCase.execute({
      mealId,
      userId,
    })

    reply.status(204).send()
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      reply.status(404).send({
        message: error.message,
      })
    }
    throw error
  }
}
