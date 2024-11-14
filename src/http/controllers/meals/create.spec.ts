import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/tests/create-and-authenticate-user'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

beforeAll(async () => {
  await app.ready()
})

afterAll(async () => {
  await app.close()
})

describe('e2e create meal testing', () => {
  it('should be able to create meal', async () => {
    const { token } = await createAndAuthenticateUser(app)
    const response = await request(app.server)
      .post('/create-meal')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'comida',
        description: '22',
        part_of_diet: true,
      })

    const { meal } = response.body

    expect(response.statusCode).toBe(201)
    expect(meal).toEqual(
      expect.objectContaining({
        name: 'comida',
        description: '22',
        part_of_diet: true,
      }),
    )
  })
})
