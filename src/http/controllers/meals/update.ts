import { ResourceNotFoundError } from '@/use-cases/errors/resouce-not-found-error'
import { makeUpdateUseCase } from '@/use-cases/factories/make-update-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function update(req: FastifyRequest, reply: FastifyReply) {
  const updateBodySchema = z.object({
    name: z.string().optional(),
    description: z.string().nullable().optional(),
    part_of_diet: z.boolean().optional(),
  })

  const updateQuerySchema = z.object({
    mealId: z.string(),
  })

  const userId = req.user.sub

  try {
    const { name, description, part_of_diet } = updateBodySchema.parse(req.body)

    const { mealId } = updateQuerySchema.parse(req.query)

    const updateUseCase = makeUpdateUseCase()

    const { updatedMeal } = await updateUseCase.execute({
      mealId,
      userId,
      name,
      description,
      part_of_diet,
    })

    reply.status(200).send({
      updatedMeal,
    })
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      reply.status(404).send({
        message: error.message,
      })
      throw error
    }
  }
}
