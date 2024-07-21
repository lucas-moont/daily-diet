import { CreateMealUseCase } from './create-meal'
import { expect, beforeEach, it, describe } from 'vitest'
import { InMemoryMealsRepository } from './in-memory-repository/in-memory-meals-repository'
import { InMemoryUsersRepository } from './in-memory-repository/in-memory-users-repository'
import { ResourceNotFoundError } from './errors/resouce-not-found-error'

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

  it('should not be able to create meal not having an id', async () => {
    await expect(
      sut.execute({
        user_id: 'não existe',
        name: 'Pãozinho com chocolate',
        description: 'Pão com creme de chocolate maromba',
        part_of_diet: true,
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should be able to increase streak when meal is part of diet', async () => {
    const user = await userRepository.create({
      email: 'lucas.monteiro@gmail.com',
      password_hash: '123456',
      name: 'Lucas',
    })

    await sut.execute({
      user_id: user.id,
      name: 'Pãozinho com chocolate',
      description: 'Pão com creme de chocolate maromba',
      part_of_diet: true,
    })

    await sut.execute({
      user_id: user.id,
      name: 'Pãozinho com chocolate',
      description: 'Pão com creme de chocolate maromba',
      part_of_diet: true,
    })

    const userUpdated = await userRepository.findById(user.id)
    expect(userUpdated?.current_streak).toBe(2)
  })

  it('should decrease streak to 0 when diet is not part of diet', async () => {
    const userCreated = await userRepository.create({
      email: 'lucas.monteiro@gmail.com',
      name: 'Lucas',
      password_hash: '123456',
    })

    await sut.execute({
      user_id: userCreated.id,
      name: '200g de frango',
      description: '200g de peito de frango',
      part_of_diet: true,
    })

    await sut.execute({
      user_id: userCreated.id,
      name: '200g de batata doce',
      description: '200g de peito de batata doce',
      part_of_diet: true,
    })

    await sut.execute({
      user_id: userCreated.id,
      name: 'pizza',
      description: 'pizza deliciosa',
      part_of_diet: false,
    })

    const user = await userRepository.findById(userCreated.id)

    expect(user?.current_streak).toBe(0)
  })
})
