import { MealRepository } from '@/repositories/meal-repository'
import { UsersRepository } from '@/repositories/user-repository'
import { Meal } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resouce-not-found-error'

interface CreateMealRequest {
  name: string
  description: string
  part_of_diet: boolean
  user_id: string
}

interface CreateMealResponse {
  meal: Meal
}

export class CreateMealUseCase {
  constructor(
    private mealUserRepository: MealRepository,
    private userRepository: UsersRepository,
  ) {}

  async execute({
    name,
    description,
    part_of_diet,
    user_id,
  }: CreateMealRequest): Promise<CreateMealResponse> {
    const user = await this.userRepository.findById(user_id)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    const meal = await this.mealUserRepository.create({
      name,
      description,
      part_of_diet,
      user_id,
    })

    await this.userRepository.updateCurrentStreak(part_of_diet, user_id)

    return {
      meal,
    }
  }
}
