import { UsersRepository } from '@/repositories/user-repository'
import { Meal } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resouce-not-found-error'
import { MealRepository } from '@/repositories/meal-repository'

interface FetchMealsUseCaseRequest {
  userId: string
  page: number
}

interface FetchMealsUseCaseResponse {
  meals: Meal[]
}

export class FetchMealsUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private mealsRepository: MealRepository,
  ) {}

  async execute({
    userId,
    page,
  }: FetchMealsUseCaseRequest): Promise<FetchMealsUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    const meals = await this.mealsRepository.fetchMealsByUserId(userId, page)

    return { meals }
  }
}
