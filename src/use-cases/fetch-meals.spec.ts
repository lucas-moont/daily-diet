import { InMemoryUsersRepository } from '@/repositories/in-memory-repository/in-memory-users-repository'
import { describe, it, beforeEach, expect } from 'vitest'
import { FetchMealsUseCase } from './fetch-meals'
import { InMemoryMealsRepository } from '@/repositories/in-memory-repository/in-memory-meals-repository'

let usersRepository: InMemoryUsersRepository
let mealsRepository: InMemoryMealsRepository
let sut: FetchMealsUseCase

describe('Fetch meals unit test', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    mealsRepository = new InMemoryMealsRepository()
    sut = new FetchMealsUseCase(usersRepository, mealsRepository)
  })

  it('should be able to fetch meals', async () => {
    await usersRepository.create({
      name: 'Lucas',
      email: 'lucas.monteiro@savvi.com.br',
      password_hash: '123456',
      id: '1',
    })

    await mealsRepository.create({
      name: 'Pizza',
      description: 'lanche',
      part_of_diet: true,
      user_id: '1',
    })

    await mealsRepository.create({
      name: 'Pizza',
      description: 'lanche',
      part_of_diet: true,
      user_id: '1',
    })

    await mealsRepository.create({
      name: 'Pizza',
      description: 'lanche',
      part_of_diet: true,
      user_id: '1',
    })

    const { meals } = await sut.execute({
      userId: '1',
      page: 1,
    })

    expect(meals).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: expect.any(String),
          description: expect.any(String),
        }),
      ]),
    )

    expect(meals).toHaveLength(3)
  })

  it('it should be able to fetch image depending on page', async () => {
    const user = await usersRepository.create({
      name: 'Lucas',
      email: 'lucas.monteiro@savvi.com.br',
      password_hash: '123456',
    })

    for (let index = 0; index < 22; index++) {
      await mealsRepository.create({
        name: 'Refeição qualquer',
        description: 'Descrição',
        user_id: user.id,
        id: `refeição-${index + 1}`,
      })
    }

    const { meals } = await sut.execute({
      userId: user.id,
      page: 2,
    })

    expect(meals).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'Refeição qualquer',
          id: 'refeição-21',
        }),
      ]),
    )

    expect(meals).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'Refeição qualquer',
          id: 'refeição-22',
        }),
      ]),
    )

    expect(meals).toHaveLength(2)
  })
})
