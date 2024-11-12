import { MealRepository } from '@/repositories/meal-repository'

interface GetMealsCountRequest {
  userId: string
}

interface GetMealsCountResponse {
  quantity: number | null
}

export class GetMealsCountUseCase {
  constructor(private mealsRepository: MealRepository) {}

  async execute({
    userId,
  }: GetMealsCountRequest): Promise<GetMealsCountResponse> {
    const quantity = await this.mealsRepository.countAllMeals(userId)

    return { quantity }
  }
}
