import { MealRepository } from '@/repositories/meal-repository'
import { UsersRepository } from '@/repositories/user-repository'
import { Meal } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resouce-not-found-error'

interface GetMealUseCaseRequest {
  userId: string
  mealId: string
}

interface GetMealUseCaseResponse {
  meal: Meal
}

export class GetMealUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private mealsRepository: MealRepository,
  ) {}

  async execute({
    userId,
    mealId,
  }: GetMealUseCaseRequest): Promise<GetMealUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)
    const meal = await this.mealsRepository.findById(mealId)

    if (!user || !meal) {
      throw new ResourceNotFoundError()
    }

    return { meal }
  }
}
