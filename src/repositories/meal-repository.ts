import { Prisma, Meal } from '@prisma/client'
import { UpdateMealsInput } from 'meal_types'

export interface MealRepository {
  create(mealsInput: Prisma.MealUncheckedCreateInput): Promise<Meal>
  findById(id: string): Promise<Meal | null>
  update(mealsInput: UpdateMealsInput): Promise<Meal | null>
}
