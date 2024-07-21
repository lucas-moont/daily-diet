import { it, describe, beforeEach, expect } from 'vitest'
import { InMemoryUsersRepository } from './in-memory-repository/in-memory-users-repository'
import { InMemoryMealsRepository } from './in-memory-repository/in-memory-meals-repository'
import { UpdateMealUseCase } from './update-meal'

let usersRepository: InMemoryUsersRepository
let mealsRepository: InMemoryMealsRepository
let sut: UpdateMealUseCase

describe('Unit tests for update meals', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    mealsRepository = new InMemoryMealsRepository()
    sut = new UpdateMealUseCase(usersRepository, mealsRepository)
  })

  it('should be able to update meal', async () => {
    const user = await usersRepository.create({
      email: 'lucas.monteiro@gmail.com',
      name: 'Lucas',
      password_hash: '123456',
    })

    const meal = await mealsRepository.create({
      name: 'Arroz e feijão',
      description: 'Almoço',
      user_id: user.id,
      part_of_diet: true,
    })

    const { updatedMeal } = await sut.execute({
      description: 'Janta',
      userId: user.id,
      mealId: meal.id,
    })

    expect(updatedMeal).toMatchObject({
      name: 'Arroz e feijão',
      description: 'Janta',
    })
  })
})
