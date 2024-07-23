import { expect, beforeEach, it, describe } from 'vitest'
import { InMemoryMealsRepository } from '@/repositories/in-memory-repository/in-memory-meals-repository'
import { GetMealUseCase } from './get-meal'
import { InMemoryUsersRepository } from '@/repositories/in-memory-repository/in-memory-users-repository'
import { ResourceNotFoundError } from './errors/resouce-not-found-error'

let usersRepository: InMemoryUsersRepository
let mealsRepository: InMemoryMealsRepository
let sut: GetMealUseCase

describe('Get meal unit tests', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    mealsRepository = new InMemoryMealsRepository()
    sut = new GetMealUseCase(usersRepository, mealsRepository)
  })

  it('should be able to get meal by id', async () => {
    await usersRepository.create({
      name: 'Lucas',
      email: 'lucas.monteiro@gmail.com',
      password_hash: '123456',
      id: '1',
    })

    await mealsRepository.create({
      name: 'Feijão',
      description: 'Almoço',
      user_id: '1',
      id: '1',
      part_of_diet: true,
    })

    const { meal } = await sut.execute({
      mealId: '1',
      userId: '1',
    })

    console.log(meal)

    expect(meal).toMatchObject({
      name: 'Feijão',
      id: '1',
      description: 'Almoço',
    })
  })

  it('should not be able to delete a meal that does not exist', async () => {
    await usersRepository.create({
      name: 'Lucas',
      email: 'lucas.monteiro@gmail.com',
      password_hash: '123456',
      id: '1',
    })

    await expect(
      sut.execute({
        mealId: '1',
        userId: '1',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
