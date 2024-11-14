import request from 'supertest'
import { FastifyInstance } from 'fastify'

export async function createMeal(
  app: FastifyInstance,
  token: string,
  part_of_diet: boolean,
) {
  const response = await request(app.server)
    .post('/create-meal')
    .set('Authorization', `Bearer ${token}`)
    .send({
      name: 'Comida qualquer',
      description: 'Blablabla',
      part_of_diet,
    })

  const { meal } = response.body

  return meal
}
