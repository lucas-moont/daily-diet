import { PrismaMealsRepository } from '@/repositories/prisma-repositories/prisma-meals-repository'
import { CreateMealUseCase } from '../create-meal'
import { PrismaUsersRepository } from '@/repositories/prisma-repositories/prisma-users-repository'

export function makeCreateMeal() {
  const mealsRepository = new PrismaMealsRepository()
  const usersRepository = new PrismaUsersRepository()
  const createMealUseCase = new CreateMealUseCase(
    mealsRepository,
    usersRepository,
  )

  return createMealUseCase
}
