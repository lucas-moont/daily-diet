import { EmailAlreadyRegistered } from '@/use-cases/errors/email-already-registered-error'
import { makeCreateUserService } from '@/use-cases/factories/make-create-user-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function register(
  request: FastifyRequest,
  response: FastifyReply,
) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().uuid().min(6),
  })

  const { name, email, password } = registerBodySchema.parse(request.body)

  try {
    const createUser = await makeCreateUserService()
    await createUser.execute({
      name,
      email,
      password,
    })
  } catch (err) {
    if (err instanceof EmailAlreadyRegistered) {
      response.status(204).send({
        message: err.message,
      })
    }
  }

  response.status(201).send()
}
