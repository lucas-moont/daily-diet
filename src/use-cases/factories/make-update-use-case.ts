import { PrismaMealsRepository } from '@/repositories/prisma-repositories/prisma-meals-repository'
import { PrismaUsersRepository } from '@/repositories/prisma-repositories/prisma-users-repository'
import { UpdateMealUseCase } from '../update-meal'

export function makeUpdateUseCase() {
  const userRepository = new PrismaUsersRepository()
  const mealRepository = new PrismaMealsRepository()
  const updateUseCase = new UpdateMealUseCase(userRepository, mealRepository)

  return updateUseCase
}
