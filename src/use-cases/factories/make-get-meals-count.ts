import { PrismaMealsRepository } from '@/repositories/prisma-repositories/prisma-meals-repository'
import { GetMealsCountUseCase } from '../get-meals-count'

export function makeGetMealsCount() {
  const mealsRepository = new PrismaMealsRepository()
  const getMealsCountUseCase = new GetMealsCountUseCase(mealsRepository)

  return getMealsCountUseCase
}
