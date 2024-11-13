import request from 'supertest'
import { FastifyInstance } from 'fastify'
import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'

export async function createAndAuthenticateUser(app: FastifyInstance) {
  await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'johndoe@email.com',
      password_hash: await hash('123456', 6),
    },
  })

  const authResponse = await request(app.server).post('/auth').send({
    username: 'johndoe@email.com',
    password: '123456',
  })

  const { token } = authResponse.body

  return { token }
}
