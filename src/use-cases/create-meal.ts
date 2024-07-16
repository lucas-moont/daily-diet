import { MealRepository } from '@/repositories/meal-repository'
import { UsersRepository } from '@/repositories/user-repository'
import { Meal } from '@prisma/client'

interface CreateMealRequest {
  name: String
  description: String
  part_of_diet: Boolean
  userId: String
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
    userId,
  }: CreateMealRequest): Promise<CreateMealResponse> {}
}
