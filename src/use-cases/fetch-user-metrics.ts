import { UsersRepository } from '@/repositories/user-repository'
import { MealRepository } from '@/repositories/meal-repository'
import { GetUserProfileUseCase } from './get-user-profile'
import { CountMealsByDietStatusUseCase } from './count-meals-by-diet-status'
import { GetMealsCountUseCase } from './get-meals-count'
import { ResourceNotFoundError } from './errors/resouce-not-found-error'

interface FetchUserMetricsRequest {
  userId: string
}

interface FetchUserMetricsResponse {
  metrics: {
    totalOfMeals: number
    partOfDietMealsQnt: number
    offTheDietMealsQnt: number
    bestStreak: number
    currentStreak: number
  }
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
    const countAllMealsQuantity = new GetMealsCountUseCase(this.mealsRepository)

    const mealsThatArePartOfDiet = await countMealsByDietStatus.execute({
      partOfDiet: true,
      userId,
    })

    const mealsThatAreOffTheDiet = await countMealsByDietStatus.execute({
      partOfDiet: false,
      userId,
    })

    const allMealsAmount = await countAllMealsQuantity.execute({
      userId,
    })

    const { user } = await getUserProfile.execute({ userId })

    if (!mealsThatArePartOfDiet || !mealsThatAreOffTheDiet || !user) {
      throw new ResourceNotFoundError()
    }

    return {
      metrics: {
        totalOfMeals: allMealsAmount.quantity ?? 0,
        partOfDietMealsQnt: mealsThatArePartOfDiet.amount,
        offTheDietMealsQnt: mealsThatAreOffTheDiet.amount,
        bestStreak: user.longest_streak,
        currentStreak: user.current_streak,
      },
    }
  }
}
