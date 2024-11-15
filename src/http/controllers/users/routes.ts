import { FastifyInstance } from 'fastify'
import { register } from './create-user'
import { authenticate } from './authenticate'
import { profile } from './profile'
import { verifyJwt } from '@/http/middlewares/verify-jwt'
import { metrics } from './metrics'
import { refresh } from './refresh'

export async function userRoutes(app: FastifyInstance) {
  app.post('/sign-up', register)
  app.post('/auth', authenticate)

  app.patch('/token/refresh', refresh)

  /*NEEDS AUTHENTICATION*/

  app.get('/me', { onRequest: verifyJwt }, profile)
  app.get('/metrics', { onRequest: verifyJwt }, metrics)
}
