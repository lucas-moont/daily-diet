import { MealRepository } from '@/repositories/meal-repository'
import { Prisma, Meal } from '@prisma/client'
import { UpdateMealsInput } from 'meal_types'
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

  async findById(id: string) {
    const meal = this.meals.find((meal) => meal.id === id)

    if (!meal) {
      return null
    }

    return meal
  }

  async update(mealsInput: UpdateMealsInput, userId: string) {
    const mealIndex = this.meals.findIndex(
      (meal) => meal.id === mealsInput.id && meal.user_id === userId,
    )

    const foundMeal = this.meals[mealIndex]

    this.meals[mealIndex] = {
      created_at: mealsInput.created_at ?? foundMeal.created_at,
      description: mealsInput.description ?? foundMeal.description,
      id: foundMeal.id,
      name: mealsInput.name ?? foundMeal.name,
      part_of_diet: mealsInput.part_of_diet ?? foundMeal.part_of_diet,
      user_id: foundMeal.user_id,
    }

    return this.meals[mealIndex]
  }

  async findByUserId(userId: string) {
    const foundMeals = this.meals.filter((meal) => meal.user_id === userId)

    return foundMeals
  }

  async delete(mealId: string, userId: string): Promise<void> {
    const indexToRemove = this.meals.findIndex(
      (meal) => meal.id === mealId && meal.user_id === userId,
    )

    this.meals.splice(indexToRemove, 1)
  }

  async fetchMealsByUserId(userId: string, page: number) {
    const meals = this.meals
      .filter((meal) => meal.user_id === userId)
      .slice((page - 1) * 20, page * 20)

    return meals
  }

  async countMealsByDietStatus(userId: string, partOfDiet: boolean) {
    const amount = this.meals.filter(
      (meal) => meal.user_id === userId && meal.part_of_diet === partOfDiet,
    ).length

    return amount
  }

  async countAllMeals(userId: string): Promise<number | null> {
    const amount = this.meals.filter((meal) => meal.user_id === userId).length

    return amount
  }
}
