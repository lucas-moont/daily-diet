import { FastifyInstance } from 'fastify'
import { register } from './create-user'
import { authenticate } from './authenticate'

export async function userRoutes(app: FastifyInstance) {
  app.post('/sign-up', register)
  app.post('/auth', authenticate)
}
