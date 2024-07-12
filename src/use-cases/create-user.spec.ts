import { it, beforeEach, describe, expect } from 'vitest'
import { CreateUserUseCase } from './create-user'
import { InMemoryUsersRepository } from './in-memory-repository/in-memory-users-repository'

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
})
