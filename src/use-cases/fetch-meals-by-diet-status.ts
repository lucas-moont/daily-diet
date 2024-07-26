import { MealRepository } from '@/repositories/meal-repository'
import { UsersRepository } from '@/repositories/user-repository'
import { Meal } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resouce-not-found-error'

interface FetchMealsByDietStatusRequest {
  userId: string
  partOfDiet: boolean
}

interface FetchMealsByDietStatusResponse {
  meals: Meal[]
}

export class FetchMealsByDietStatusUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private mealsRepository: MealRepository,
  ) {}

  async execute({
    userId,
    partOfDiet,
  }: FetchMealsByDietStatusRequest): Promise<FetchMealsByDietStatusResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    const meals = await this.mealsRepository.
  }
}
