import { CreateMealUseCase } from './create-meal'
import { expect, beforeEach, it, describe } from 'vitest'
import { InMemoryMealsRepository } from './in-memory-repository/in-memory-meals-repository'
import { InMemoryUsersRepository } from './in-memory-repository/in-memory-users-repository'

let userRepository: InMemoryUsersRepository
let mealRepository: InMemoryMealsRepository
let sut: CreateMealUseCase

describe('Create Meat Unit Test', () => {
  beforeEach(() => {
    userRepository = new InMemoryUsersRepository()
    mealRepository = new InMemoryMealsRepository()
    sut = new CreateMealUseCase(mealRepository, userRepository)
  })

  it('should be able to create a meal', async () => {
    const user = await userRepository.create({
      email: 'lucas.monteiro@gmail.com',
      password_hash: '123456',
      name: 'Lucas',
    })

    const { meal } = await sut.execute({
      user_id: user.id,
      name: 'Pãozinho com chocolate',
      description: 'Pão com creme de chocolate maromba',
      part_of_diet: true,
    })

    expect(meal).toMatchObject({
      name: 'Pãozinho com chocolate',
    })
  })
})
