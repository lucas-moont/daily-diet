import { ResourceNotFoundError } from '@/use-cases/errors/resouce-not-found-error'
import { makeCreateMeal } from '@/use-cases/factories/make-create-meal'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function create(req: FastifyRequest, reply: FastifyReply) {
  const createMealBodySchema = z.object({
    name: z.string(),
    description: z.string(),
    part_of_diet: z.boolean().nullable(),
  })

  try {
    const { name, description, part_of_diet } = createMealBodySchema.parse(
      req.body,
    )
    const user_id = req.user.sub

    const createMealUseCase = makeCreateMeal()

    const { meal } = await createMealUseCase.execute({
      name,
      user_id,
      description,
      part_of_diet: part_of_diet ?? true,
    })

    reply.status(201).send({
      meal,
    })
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      reply.status(404).send({ message: error.message })
    }
    throw error
  }
}
