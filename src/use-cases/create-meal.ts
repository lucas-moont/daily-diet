import { MealRepository } from '@/repositories/meal-repository'
import { UsersRepository } from '@/repositories/user-repository'
import { Meal } from '@prisma/client'

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
    // TODO: IF USER DOES NOT EXIST, SEND AN ERROR
    const meal = await this.mealUserRepository.create({
      name,
      description,
      part_of_diet,
      user_id,
    })

    await this.userRepository.update_current_streak(part_of_diet, user_id)

    return {
      meal,
    }
  }
}
