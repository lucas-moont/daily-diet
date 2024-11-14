import { PrismaUsersRepository } from '@/repositories/prisma-repositories/prisma-users-repository'
import { DeleteMealUseCase } from '../delete-meal'
import { PrismaMealsRepository } from '@/repositories/prisma-repositories/prisma-meals-repository'

export function makeDeleteMealUseCase() {
  const userRepository = new PrismaUsersRepository()
  const mealRepository = new PrismaMealsRepository()
  const deleteMealUseCase = new DeleteMealUseCase(
    userRepository,
    mealRepository,
  )

  return deleteMealUseCase
}
