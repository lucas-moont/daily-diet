import { InMemoryUsersRepository } from '@/repositories/in-memory-repository/in-memory-users-repository'
import { it, beforeEach, expect, describe } from 'vitest'
import { GetUserProfileUseCase } from './get-user-profile'

let sut: GetUserProfileUseCase
let usersRepository: InMemoryUsersRepository

beforeEach(async () => {
  usersRepository = new InMemoryUsersRepository()
  sut = new GetUserProfileUseCase(usersRepository)
})

describe('get profile info', () => {
  it('should be able to get profile information', async () => {
    const createdUser = await usersRepository.create({
      name: 'lucas',
      password_hash: '123456',
      email: 'lucas.monteiro@gmail.com',
    })

    const { user } = await sut.execute({
      userId: createdUser.id,
    })

    expect(user).toEqual(
      expect.objectContaining({ email: 'lucas.monteiro@gmail.com' }),
    )
  })
})
