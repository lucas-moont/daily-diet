import { MealRepository } from '@/repositories/meal-repository'
import { UsersRepository } from '@/repositories/user-repository'
import { ResourceNotFoundError } from './errors/resouce-not-found-error'
import { recalculateStreak } from '@/utils/recalculate-streak'

interface DeleteMealUseCaseRequest {
  userId: string
  mealId: string
}

export class DeleteMealUseCase {
  constructor(
    private userRepository: UsersRepository,
    private mealsRepository: MealRepository,
  ) {}

  async execute({ userId, mealId }: DeleteMealUseCaseRequest): Promise<void> {
    const user = await this.userRepository.findById(userId)
    const meal = await this.mealsRepository.findById(mealId)

    if (!user || !meal) {
      throw new ResourceNotFoundError()
    }

    await this.mealsRepository.delete(mealId, userId)

    const meals = await this.mealsRepository.findByUserId(userId)
    const { current_streak, longest_streak } = await recalculateStreak(meals)
    await this.userRepository.reUpdateStreaks(
      userId,
      current_streak,
      longest_streak,
    )
  }
}
