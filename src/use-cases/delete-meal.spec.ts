import { expect, beforeEach, it, describe } from 'vitest'
import { InMemoryMealsRepository } from '@/repositories/in-memory-repository/in-memory-meals-repository'
import { InMemoryUsersRepository } from '@/repositories/in-memory-repository/in-memory-users-repository'
import { DeleteMealUseCase } from './delete-meal'

let sut: DeleteMealUseCase
let usersRepository: InMemoryUsersRepository
let mealsRepository: InMemoryMealsRepository

describe('Unit tests for deleting meals', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    mealsRepository = new InMemoryMealsRepository()

    sut = new DeleteMealUseCase(usersRepository, mealsRepository)
  })

  it('should be able to delete a meal', async () => {
    const user = await usersRepository.create({
      email: 'lucas.monteiro@gmail.com.br',
      password_hash: '123456',
      name: 'Lucas',
    })

    await mealsRepository.create({
      description: 'Janta',
      name: 'Feijão, arroz e frango',
      user_id: user.id,
      id: '0',
    })

    await mealsRepository.create({
      description: 'Janta',
      name: 'Feijão, arroz e frango',
      user_id: user.id,
      id: '1',
    })

    await mealsRepository.create({
      description: 'Janta',
      name: 'Feijão, arroz e frango',
      user_id: user.id,
      id: '2',
    })

    await sut.execute({
      mealId: '2',
      userId: user.id,
    })

    const mealsQuantity = mealsRepository.meals.length

    expect(mealsQuantity).toBe(2)
  })

  it('deleting a meal should make a negativily difference into the streaks', async () => {
    const user = await usersRepository.create({
      email: 'lucas.monteiro@gmail.com.br',
      password_hash: '123456',
      name: 'Lucas',
    })

    for (let i = 1; i <= 20; i++) {
      await mealsRepository.create({
        description: 'descrição',
        name: `refeição-${i}`,
        id: `${i}`,
        user_id: user.id,
        part_of_diet: true,
      })
    }

    await sut.execute({
      mealId: '20',
      userId: user.id,
    })

    const foundUser = await usersRepository.findById(user.id)

    expect(foundUser?.current_streak).toBe(19)
    expect(foundUser?.longest_streak).toBe(19)
  })

  it('should affect positively to a streak', async () => {
    const user = await usersRepository.create({
      email: 'lucas.monteiro@gmail.com.br',
      password_hash: '123456',
      name: 'Lucas',
    })

    for (let i = 1; i <= 10; i++) {
      await mealsRepository.create({
        description: 'descrição',
        name: `refeição-${i}`,
        id: `${i}`,
        user_id: user.id,
        part_of_diet: true,
      })
    }

    await mealsRepository.create({
      description: 'descrição',
      name: `refeição-11`,
      id: `11`,
      user_id: user.id,
      part_of_diet: false,
    })

    for (let i = 12; i <= 20; i++) {
      await mealsRepository.create({
        description: 'descrição',
        name: `refeição-${i}`,
        id: `${i}`,
        user_id: user.id,
        part_of_diet: true,
      })
    }

    await sut.execute({
      mealId: '11',
      userId: user.id,
    })

    const foundUser = await usersRepository.findById(user.id)

    expect(foundUser?.current_streak).toBe(19)
    expect(foundUser?.longest_streak).toBe(19)
  })
})
