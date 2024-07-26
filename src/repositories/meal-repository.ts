import { Prisma, Meal } from '@prisma/client'
import { UpdateMealsInput } from 'meal_types'

export interface MealRepository {
  create(mealsInput: Prisma.MealUncheckedCreateInput): Promise<Meal>
  findById(id: string): Promise<Meal | null>
  update(mealsInput: UpdateMealsInput, userId: string): Promise<Meal>
  findByUserId(userId: string): Promise<Meal[]>
  delete(mealId: string, userId: string): Promise<void>
  fetchMealsByUserId(userId: string, page: number): Promise<Meal[]>
  countMealsByDietStatus(userId: string, partOfDiet: boolean): Promise<number>
}
