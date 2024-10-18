import { MealRepository } from '@/repositories/meal-repository'
import { UsersRepository } from '@/repositories/user-repository'
import { Meal } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resouce-not-found-error'
import { recalculateStreak } from '@/utils/recalculate-streak'

interface UpdateMealRequestUseCase {
  userId: string
  mealId: string
  name?: string | null | undefined
  description?: string | null | undefined
  created_at?: Date | null | undefined
  part_of_diet?: boolean | null | undefined
}

interface UpdateMealUseCaseResponse {
  updatedMeal: Meal | null
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

    const updatedMeal = await this.mealsRepository.update(
      {
        id: mealId,
        created_at,
        description,
        name,
        part_of_diet,
      },
      userId,
    )

    if (meal.part_of_diet !== part_of_diet) {
      const meals = await this.mealsRepository.findByUserId(userId)
      const { current_streak, longest_streak } = await recalculateStreak(meals)
      await this.usersRepository.reUpdateStreaks(
        userId,
        current_streak,
        longest_streak,
      )
    }

    return { updatedMeal }
  }
}
