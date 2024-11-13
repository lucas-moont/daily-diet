import request from 'supertest'
import { app } from '@/app'
import { it, describe, beforeAll, afterAll, expect } from 'vitest'

beforeAll(() => {
  app.ready()
})

afterAll(() => {
  app.close()
})

describe('e2e testing for authentication', () => {
  it('should be able to authenticate', async () => {
    await request(app.server).post('/sign-up').send({
      name: 'Lucas',
      email: 'luks.monteiro.13@gmail.com',
      password: '123456',
    })

    const response = await request(app.server).post('/auth').send({
      username: 'luks.monteiro.13@gmail.com',
      password: '123456',
    })

    const { token } = response.body

    expect(response.statusCode).toBe(200)
    expect(token).toBeTypeOf('string')
  })
})
