import { it, describe, beforeAll, afterAll, expect } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { randomUUID } from 'crypto'

beforeAll(() => {
  app.ready()
})

afterAll(() => {
  app.close()
})

describe('e2e testing for registration', () => {
  it('should be able to register', async () => {
    const response = await request(app.server).post('/sign-up').send({
      name: 'Lucas',
      email: 'luks.monteiro.13@gmail.com',
      password: randomUUID(),
    })

    expect(response.statusCode).toBe(201)
  })
})
