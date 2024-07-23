import { MealRepository } from '@/repositories/meal-repository'
import { UsersRepository } from '@/repositories/user-repository'
import { ResourceNotFoundError } from './errors/resouce-not-found-error'

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

    await this.mealsRepository.delete(mealId)
  }
}
// TODO: teste para deletar a refeição
