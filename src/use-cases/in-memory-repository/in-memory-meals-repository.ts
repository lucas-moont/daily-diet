import { MealRepository } from '@/repositories/meal-repository'
import { Prisma, Meal } from '@prisma/client'
import { randomUUID } from 'crypto'

export class InMemoryMealsRepository implements MealRepository {
  meals: Meal[] = []

  async create(mealsInput: Prisma.MealUncheckedCreateInput) {
    const meal: Meal = {
      created_at: new Date(),
      description: mealsInput.description ?? null,
      id: mealsInput.id ?? randomUUID(),
      name: mealsInput.name,
      part_of_diet: mealsInput.part_of_diet ?? true,
      user_id: mealsInput.user_id,
    }

    this.meals.push(meal)

    return meal
  }
}
