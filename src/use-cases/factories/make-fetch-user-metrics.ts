import { PrismaMealsRepository } from '@/repositories/prisma-repositories/prisma-meals-repository'
import { PrismaUsersRepository } from '@/repositories/prisma-repositories/prisma-users-repository'
import { FetchMealsUseCase } from '../fetch-meals'

export function makeFetchUserMetrics() {
  const usersRepository = new PrismaUsersRepository()
  const mealsRepository = new PrismaMealsRepository()
  const fetchUserMetricsUseCase = new FetchMealsUseCase(
    usersRepository,
    mealsRepository,
  )

  return fetchUserMetricsUseCase
}
