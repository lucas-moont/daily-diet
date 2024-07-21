import { MealRepository } from '@/repositories/meal-repository'
import { UsersRepository } from '@/repositories/user-repository'
import { Meal } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resouce-not-found-error'

interface UpdateMealRequestUseCase {
  userId: string
  mealId: string
  name: string | null | undefined
  description: string | null | undefined
  created_at: Date | null | undefined
  part_of_diet: boolean | null | undefined
}

interface UpdateMealUseCaseResponse {
  meal: Meal
}

export class UpdateMealUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private mealsRepository: MealRepository,
  ) {}

  async execute({
    userId,
    mealId,
    name,
    description,
    created_at,
    part_of_diet,
  }: UpdateMealRequestUseCase): Promise<UpdateMealUseCaseResponse> {
    const meal = await this.mealsRepository.findById(mealId)
    const user = await this.usersRepository.findById(userId)

    if (!meal || !user) {
      throw new ResourceNotFoundError()
    }

    return { meal }
  }
}
