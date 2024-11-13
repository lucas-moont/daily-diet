import { PrismaMealsRepository } from '@/repositories/prisma-repositories/prisma-meals-repository'
import { PrismaUsersRepository } from '@/repositories/prisma-repositories/prisma-users-repository'
import { FetchUserMetricsUseCase } from '../fetch-user-metrics'

export function makeFetchUserMetrics() {
  const usersRepository = new PrismaUsersRepository()
  const mealsRepository = new PrismaMealsRepository()
  const fetchUserMetricsUseCase = new FetchUserMetricsUseCase(
    usersRepository,
    mealsRepository,
  )

  return fetchUserMetricsUseCase
}
