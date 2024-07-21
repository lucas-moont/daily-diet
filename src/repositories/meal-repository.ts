import { Prisma, Meal } from '@prisma/client'

export interface MealRepository {
  create(mealsInput: Prisma.MealUncheckedCreateInput): Promise<Meal>
  findById(id: string): Promise<Meal | null>
  update(mealsInput: Prisma.MealUpdateInput): Promise<Meal>
}
