import { UsersRepository } from '@/repositories/user-repository'
import { MealRepository } from '@/repositories/meal-repository'
import { GetUserProfileUseCase } from './get-user-profile'
import { CountMealsByDietStatusUseCase } from './count-meals-by-diet-status'

interface FetchUserMetricsRequest {
  userId: string
}

interface FetchUserMetricsResponse {
  totalOfMeals: number
  partOfDietMealsQnt: number
  OffTheDietMealsQnt: number
  bestStreak: number
  currentStreak: number
}

export class FetchUserMetricsUseCase {
  constructor(
    private userRepository: UsersRepository,
    private mealsRepository: MealRepository,
  ) {}

  async execute({
    userId,
  }: FetchUserMetricsRequest): Promise<FetchUserMetricsResponse> {
    const getUserProfile = new GetUserProfileUseCase(this.userRepository)
    const countMealsByDietStatus = new CountMealsByDietStatusUseCase(
      this.userRepository,
      this.mealsRepository,
    )

    const mealsThatArePartOfDiet = await countMealsByDietStatus.execute({
      partOfDiet: true,
      userId,
    })

    const mealsThatAreOffTheDiet = await countMealsByDietStatus.execute({
      partOfDiet: false,
      userId,
    })

    const { user } = await getUserProfile.execute({ userId })

    return {
      totalOfMeals: 2,
      partOfDietMealsQnt: mealsThatArePartOfDiet.amount,
      OffTheDietMealsQnt: mealsThatAreOffTheDiet.amount,
      bestStreak: user.longest_streak,
      currentStreak: user.current_streak,
    }
  }
}
