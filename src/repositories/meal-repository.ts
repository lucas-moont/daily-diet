import { Prisma, Meal } from '@prisma/client'

export interface MealRepository {
  create(mealsInput: Prisma.MealCreateInput): Promise<Meal>
}
