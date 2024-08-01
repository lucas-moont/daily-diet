import { it, describe, beforeEach, expect } from 'vitest'
import { InMemoryUsersRepository } from '../repositories/in-memory-repository/in-memory-users-repository'
import { InMemoryMealsRepository } from '../repositories/in-memory-repository/in-memory-meals-repository'
import { UpdateMealUseCase } from './update-meal'

let usersRepository: InMemoryUsersRepository
let mealsRepository: InMemoryMealsRepository
let sut: UpdateMealUseCase

describe('Unit tests for update meals', () => {
  beforeEach(async () => {
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

  it('should be able to get updated meal information', async () => {
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

    await sut.execute({
      description: 'Janta',
      userId: user.id,
      mealId: meal.id,
    })

    const updatedMeal = await mealsRepository.findById(meal.id)

    expect(updatedMeal).toMatchObject({
      name: 'Arroz e feijão',
      description: 'Janta',
    })
  })

  it('should recalculate string when a meal is updated', async () => {
    const user = await usersRepository.create({
      email: 'lucas.monteiro@gmail.com',
      name: 'Lucas',
      password_hash: '123456',
    })

    for (let i = 1; i < 21; i++) {
      await mealsRepository.create({
        description: 'Descriçãlo qualquer',
        name: `Refeição ${i}`,
        user_id: user.id,
        id: `ref-${i}`,
        part_of_diet: true,
      })
    }

    await sut.execute({
      mealId: 'ref-4',
      userId: user.id,
      part_of_diet: false,
    })

    const foundUser = await usersRepository.findById(user.id)

    expect(foundUser?.longest_streak).toBe(16)
    expect(foundUser?.current_streak).toBe(16)
  })

  it('should be able to fix streaks positivily', async () => {
    const user = await usersRepository.create({
      email: 'lucas.monteiro@gmail.com',
      name: 'Lucas',
      password_hash: '123456',
    })

    await mealsRepository.create({
      description: 'Descriçãlo qualquer',
      name: `Refeição 1`,
      user_id: user.id,
      id: `ref-1`,
      part_of_diet: true,
    })

    for (let i = 2; i < 21; i++) {
      await mealsRepository.create({
        description: 'Descriçãlo qualquer',
        name: `Refeição ${i}`,
        user_id: user.id,
        id: `ref-${i}`,
        part_of_diet: false,
      })
    }

    for (let i = 2; i <= 3; i++) {
      await sut.execute({
        mealId: `ref-${i}`,
        userId: user.id,
        part_of_diet: true,
      })
    }

    await sut.execute({
      mealId: `ref-20`,
      userId: user.id,
      part_of_diet: true,
    })

    const foundUser = await usersRepository.findById(user.id)

    expect(foundUser?.longest_streak).toBe(3)
    expect(foundUser?.current_streak).toBe(1)
  })
})
