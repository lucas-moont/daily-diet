import { MealRepository } from '@/repositories/meal-repository'
import { UsersRepository } from '@/repositories/user-repository'
import { Meal } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resouce-not-found-error'

interface CountMealsByDietStatusRequest {
  userId: string
  partOfDiet: boolean
}

interface CountMealsByDietStatusResponse {
  meals: Meal[]
}

export class CountMealsByDietStatusUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private mealsRepository: MealRepository,
  ) {}

  async execute({
    userId,
    partOfDiet,
  }: CountMealsByDietStatusRequest): Promise<CountMealsByDietStatusResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    const meals = await this.mealsRepository.
  }
}
