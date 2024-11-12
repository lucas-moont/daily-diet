import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryMealsRepository } from '@/repositories/in-memory-repository/in-memory-meals-repository'
import { InMemoryUsersRepository } from '@/repositories/in-memory-repository/in-memory-users-repository'
import { GetMealsCountUseCase } from './get-meals-count'

let sut: GetMealsCountUseCase
let mealRepository: InMemoryMealsRepository
let userRepository: InMemoryUsersRepository

beforeEach(async () => {
  mealRepository = new InMemoryMealsRepository()
  userRepository = new InMemoryUsersRepository()
  sut = new GetMealsCountUseCase(mealRepository)

  userRepository.create({
    name: 'Lucas',
    email: 'lucas.monteiro@gmail.com',
    id: '1',
    password_hash: '123456',
  })

  for (let i = 0; i < 5; i++) {
    mealRepository.create({
      description: 'almoço',
      name: 'random',
      user_id: '1',
    })
  }
})

describe('get all meals quantity test', () => {
  it('should be able to get all meals made by a user', async () => {
    const { quantity } = await sut.execute({
      userId: '1',
    })

    expect(quantity).toBe(5)
  })
})
