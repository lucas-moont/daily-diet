import { InMemoryUsersRepository } from '@/repositories/in-memory-repository/in-memory-users-repository'
import { GetLongestStreakUseCase } from './get-longest-streak'
import { it, beforeEach, expect, describe } from 'vitest'
import { InMemoryMealsRepository } from '@/repositories/in-memory-repository/in-memory-meals-repository'
import { CreateMealUseCase } from './create-meal'

let usersRepository: InMemoryUsersRepository
let sut: GetLongestStreakUseCase
let mealsRepository: InMemoryMealsRepository
let createMealUseCase: CreateMealUseCase

describe('get longest streak tests', async () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    mealsRepository = new InMemoryMealsRepository()
    createMealUseCase = new CreateMealUseCase(mealsRepository, usersRepository)
    sut = new GetLongestStreakUseCase(usersRepository)
  })

  it('should be able to get longest streak', async () => {
    await usersRepository.create({
      name: 'Lucas',
      email: 'luks.monteiro@gmail.com',
      password_hash: '123456',
      id: '1',
    })

    for (let i = 0; i < 3; i++) {
      createMealUseCase.execute({
        name: 'almoço',
        description: 'gostosa',
        user_id: '1',
        part_of_diet: true,
      })
    }

    await mealsRepository.create({
      name: 'Almoço',
      user_id: '1',
      part_of_diet: true,
      description: '',
    })

    const { record } = await sut.execute({ userId: '1' })

    expect(record).toBe(3)
  })
})
