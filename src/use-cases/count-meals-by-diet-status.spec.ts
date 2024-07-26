import { expect, it, describe, beforeEach } from 'vitest'
import { InMemoryMealsRepository } from '@/repositories/in-memory-repository/in-memory-meals-repository'
import { InMemoryUsersRepository } from '@/repositories/in-memory-repository/in-memory-users-repository'
import { CountMealsByDietStatusUseCase } from './count-meals-by-diet-status'

let usersRepository: InMemoryUsersRepository
let mealsRepository: InMemoryMealsRepository
let sut: CountMealsByDietStatusUseCase

describe('Count meals by diet status unit tests', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    mealsRepository = new InMemoryMealsRepository()
    sut = new CountMealsByDietStatusUseCase(usersRepository, mealsRepository)
  })

  it('should be able to get meals count for meals within the diet', async () => {
    await usersRepository.create({
      name: 'Lucas',
      email: 'lucas.monteiro@email.com',
      password_hash: '123456',
      id: '1',
    })

    await mealsRepository.create({
      name: 'Macarrão',
      description: 'almoço',
      user_id: '1',
      part_of_diet: true,
    })

    await mealsRepository.create({
      name: 'Macarrão',
      description: 'almoço',
      user_id: '1',
      part_of_diet: true,
    })

    await mealsRepository.create({
      name: 'Pizza',
      description: 'lanche',
      user_id: '1',
      part_of_diet: false,
    })

    const { amount } = await sut.execute({
      userId: '1',
      partOfDiet: true,
    })

    expect(amount).toBe(2)
  })
})
