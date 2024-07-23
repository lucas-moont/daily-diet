import { it, beforeEach, describe, expect } from 'vitest'
import { CreateUserUseCase } from './create-user'
import { InMemoryUsersRepository } from '../repositories/in-memory-repository/in-memory-users-repository'
import { EmailAlreadyRegistered } from './errors/email-already-registered-error'

let usersRepository: InMemoryUsersRepository
let sut: CreateUserUseCase

describe('Create Users Unit Test', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new CreateUserUseCase(usersRepository)
  })

  it('should be able to create users', async () => {
    const { user } = await sut.execute({
      name: 'Lucas',
      email: 'lucas.monteiro.13@gmail.com',
      password: '123456',
    })

    expect(user).toMatchObject({
      name: 'Lucas',
    })
  })

  it('should not be able to register twice with the same e-mail', async () => {
    await sut.execute({
      name: 'Lucas',
      email: 'lucas.monteiro.13@gmail.com',
      password: '123456',
    })

    await expect(
      sut.execute({
        name: 'Lucas',
        email: 'lucas.monteiro.13@gmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(EmailAlreadyRegistered)
  })
})
