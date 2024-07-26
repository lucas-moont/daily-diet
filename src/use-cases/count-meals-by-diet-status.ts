import { MealRepository } from '@/repositories/meal-repository'
import { UsersRepository } from '@/repositories/user-repository'
import { ResourceNotFoundError } from './errors/resouce-not-found-error'

interface CountMealsByDietStatusRequest {
  userId: string
  partOfDiet: boolean
}

interface CountMealsByDietStatusResponse {
  amount: number
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

    const amount = await this.mealsRepository.countMealsByDietStatus(
      userId,
      partOfDiet,
    )

    return { amount }
  }
}
