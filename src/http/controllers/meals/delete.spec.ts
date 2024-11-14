import { app } from '@/app'
import request from 'supertest'
import { afterAll, beforeAll, describe, it, expect } from 'vitest'
import { createMeal } from '@/utils/tests/create-meal'
import { createAndAuthenticateUser } from '@/utils/tests/create-and-authenticate-user'

beforeAll(async () => {
  await app.ready()
})

afterAll(async () => {
  await app.close()
})

describe('delete meal E2E testing', async () => {
  it('should be able to delete meal', async () => {
    const { token } = await createAndAuthenticateUser(app)

    await createMeal(app, token, true)
    const meal = await createMeal(app, token, true)

    const response = await request(app.server)
      .delete(`/delete-meal/${meal.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toBe(204)
  })
})
