import request from 'supertest'
import { app } from '@/app'
import { describe, beforeAll, afterAll, it, expect } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/tests/create-and-authenticate-user'
import { createMeal } from '@/utils/tests/create-meal'

beforeAll(async () => {
  app.ready()
})

afterAll(async () => {
  app.close()
})

describe('fetch user metrics E2E', async () => {
  it('should be able to get use metrics', async () => {
    const { token } = await createAndAuthenticateUser(app)

    for (let i = 0; i < 5; i++) {
      await createMeal(app, token, true)
    }

    await createMeal(app, token, false)

    const response = await request(app.server)
      .get('/metrics')
      .set('Authorization', `Bearer ${token}`)
      .send()

    const { metrics } = response.body

    expect(response.statusCode).toBe(200)
    expect(metrics).toEqual(
      expect.objectContaining({
        totalOfMeals: 6,
      }),
    )
  })
})
