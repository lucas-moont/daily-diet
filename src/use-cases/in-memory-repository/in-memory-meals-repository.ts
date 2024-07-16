import { MealRepository } from '@/repositories/meal-repository'
import { Prisma, Meal } from '@prisma/client'

export class InMemoryMealsRepository implements MealRepository {
  meals: Meal[] = []

  async create(mealsInput) {
    
  }
}
