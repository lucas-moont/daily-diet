import { verifyJwt } from '@/http/middlewares/verify-jwt'
import { FastifyInstance } from 'fastify'
import { create } from './create'
import { deleteMeal } from './delete'

export async function mealRoutes(app: FastifyInstance) {
  app.post('/create-meal', { onRequest: verifyJwt }, create)
  app.delete('/delete-meal/:mealId', { onRequest: verifyJwt }, deleteMeal)
}
