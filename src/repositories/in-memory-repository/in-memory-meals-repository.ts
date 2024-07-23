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

  async update(mealsInput: UpdateMealsInput) {
    const mealIndex = this.meals.findIndex((meal) => meal.id === mealsInput.id)

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
}
