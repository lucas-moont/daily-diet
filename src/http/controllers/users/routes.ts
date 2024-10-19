import { FastifyInstance } from 'fastify'
import { register } from './create-user'

export async function userRoutes(app: FastifyInstance) {
  app.post('/sign-up', register)
}
