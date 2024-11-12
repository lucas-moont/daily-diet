import { InMemoryMealsRepository } from '@/repositories/in-memory-repository/in-memory-meals-repository'
import { InMemoryUsersRepository } from '@/repositories/in-memory-repository/in-memory-users-repository'
import { beforeEach, describe, it, expect } from 'vitest'
import { FetchUserMetricsUseCase } from './fetch-user-metrics'
import { CreateMealUseCase } from './create-meal'

let userRepository: InMemoryUsersRepository
let mealRepository: InMemoryMealsRepository
let createMealUseCase: CreateMealUseCase
let sut: FetchUserMetricsUseCase

describe('fetch user metrics unit tests', () => {
  beforeEach(async () => {
    userRepository = new InMemoryUsersRepository()
    mealRepository = new InMemoryMealsRepository()
    createMealUseCase = new CreateMealUseCase(mealRepository, userRepository)
    sut = new FetchUserMetricsUseCase(userRepository, mealRepository)

    await userRepository.create({
      name: 'Lucas',
      email: 'lucas@gmail.com',
      password_hash: '123456',
      id: '1',
    })

    for (let i = 0; i < 3; i++) {
      await createMealUseCase.execute({
        description: 'ww',
        name: 'Qualquer refeição',
        user_id: '1',
        part_of_diet: true,
      })
    }

    for (let i = 0; i < 3; i++) {
      await createMealUseCase.execute({
        description: 'ww',
        name: 'Qualquer refeição',
        user_id: '1',
        part_of_diet: false,
      })
    }
  })

  it('should be able to get user metrics', async () => {
    const { metrics } = await sut.execute({
      userId: '1',
    })

    expect(metrics).toEqual(
      expect.objectContaining({
        totalOfMeals: 6,
        partOfDietMealsQnt: 3,
        offTheDietMealsQnt: 3,
        bestStreak: 3,
        currentStreak: 0,
      }),
    )
  })
})
