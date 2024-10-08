import { expect, describe, it, beforeEach } from 'vitest'
import { AuthenticateUseCase } from './authenticate'
import { InMemoryUsersRepository } from '@/repositories/in-memory-repository/in-memory-users-repository'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

let usersRepository: InMemoryUsersRepository
let sut: AuthenticateUseCase

describe('Authenticate Unit Tests', () => {
  beforeEach(async () => {
    usersRepository = new InMemoryUsersRepository()
    sut = new AuthenticateUseCase(usersRepository)

    usersRepository.create({
      name: 'Lucas',
      email: 'lucas.monteiro@email.com',
      password_hash: await hash('123456', 6),
    })
  })

  it('should be able to authenticate', async () => {
    const { user } = await sut.execute({
      username: 'lucas.monteiro@email.com',
      password: '123456',
    })

    expect(user).toMatchObject({
      name: 'Lucas',
      email: 'lucas.monteiro@email.com',
    })
  })

  it('should not be able to authenticate with wrong password', async () => {
    await expect(
      sut.execute({
        username: 'lucas.monteiro@email.com',
        password: '12345',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with invalid email', async () => {
    await expect(
      sut.execute({
        username: 'lucas.monteir@email.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
