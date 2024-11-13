import { FastifyInstance } from 'fastify'
import { register } from './create-user'
import { authenticate } from './authenticate'
import { profile } from './profile'
import { verifyJwt } from '@/http/middlewares/verify-jwt'

export async function userRoutes(app: FastifyInstance) {
  app.post('/sign-up', register)
  app.post('/auth', authenticate)

  app.get('/me', { onRequest: verifyJwt }, profile)
}
