import { beforeAll, afterAll, expect, describe, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'

beforeAll(async () => {
  app.ready()
})

afterAll(async () => {
  app.close()
})

describe('e2e testing for refresh controller', async () => {
  it('should be able to refresh token', async () => {
    await request(app.server).post('/sign-up').send({
      name: 'Lucas',
      email: 'luks.monteiro.13@gmail.com',
      password: '123456',
    })

    const authResponse = await request(app.server).post('/auth').send({
      username: 'luks.monteiro.13@gmail.com',
      password: '123456',
    })

    const cookies = authResponse.get('Set-Cookie')

    if (!cookies) {
      throw Error()
    }
    const response = await request(app.server)
      .patch('/token/refresh')
      .set('Cookie', cookies)
      .send()

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
    expect(response.get('Set-Cookie')).toEqual([
      expect.stringContaining('refreshToken='),
    ])
  })
})
