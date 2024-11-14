import { verifyJwt } from '@/http/middlewares/verify-jwt'
import { FastifyInstance } from 'fastify'
import { create } from './create'

export async function mealRoutes(app: FastifyInstance) {
  app.post('/create-meal', { onRequest: verifyJwt }, create)
}
