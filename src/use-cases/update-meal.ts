import { MealRepository } from '@/repositories/meal-repository'
import { UsersRepository } from '@/repositories/user-repository'
import { Meal } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resouce-not-found-error'

interface UpdateMealRequestUseCase {
  userId: string
  mealId: string
  name?: string | null | undefined
  description?: string | null | undefined
  created_at?: Date | null | undefined
  part_of_diet?: boolean | null | undefined
}

interface UpdateMealUseCaseResponse {
  updatedMeal: Meal
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

    if(meal.part_of_diet !== part_of_diet) {
      await this.usersRepository.updateCurrentStreak()
    }

    // TODO: lógica para resetar a streak caso ela seja falsa
    // NÃO BASTA APENAS AUMENTAR A STREAK, PRECISAMOS, CASO ELA TENHA VOLTADO A 0, PEGAR O CONTADOR DE ONDE FOI PARADO
    // TAMBÉM PRECISAMOS MUDAR O LONGEST STREAK CASO ELA ESTEJA LIGADA A UMA REFEIÇÃO QUE DEVIA SER FORA DA DIETA

    return { updatedMeal }
  }
}
