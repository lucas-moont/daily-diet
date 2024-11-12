import { Prisma, Meal } from '@prisma/client'
import { MealRepository } from '../meal-repository'
import { prisma } from '@/lib/prisma'
import { UpdateMealsInput } from 'meal_types'

export class PrismaMealsRepository implements MealRepository {
  async create(mealsInput: Prisma.MealUncheckedCreateInput): Promise<Meal> {
    const meal = await prisma.meal.create({
      data: mealsInput,
    })

    return meal
  }

  async findById(id: string): Promise<Meal | null> {
    const meal = await prisma.meal.findUnique({
      where: {
        id,
      },
    })

    return meal
  }

  async update(
    mealsInput: UpdateMealsInput,
    userId: string,
  ): Promise<Meal | null> {
    const foundMeal = await prisma.meal.findUnique({
      where: {
        id: mealsInput.id,
      },
    })

    let meal: Meal | null

    if (!foundMeal) {
      meal = null
      return meal
    }

    meal = await prisma.meal.update({
      where: {
        id: mealsInput.id,
        user_id: userId,
      },
      data: {
        name: mealsInput.name ?? foundMeal?.name,
        created_at: mealsInput.created_at ?? foundMeal?.created_at,
        description: mealsInput.description ?? foundMeal?.description,
        part_of_diet: mealsInput.part_of_diet ?? foundMeal?.part_of_diet,
      },
    })

    return meal
  }

  async findByUserId(userId: string): Promise<Meal[]> {
    const meals = await prisma.meal.findMany({
      where: {
        user_id: userId,
      },
    })

    return meals
  }

  async delete(mealId: string, userId: string): Promise<void> {
    await prisma.meal.delete({
      where: {
        id: mealId,
        user_id: userId,
      },
    })
  }

  async fetchMealsByUserId(userId: string, page: number): Promise<Meal[]> {
    const meals = await prisma.meal.findMany({
      where: {
        user_id: userId,
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return meals
  }

  async countMealsByDietStatus(
    userId: string,
    partOfDiet: boolean,
  ): Promise<number> {
    const amount = await prisma.meal.count({
      where: {
        user_id: userId,
        part_of_diet: partOfDiet,
      },
    })

    return amount
  }

  async countAllMeals(userId: string): Promise<number | null> {
    const amount = await prisma.meal.count({
      where: {
        user_id: userId,
      },
    })

    return amount
  }
}
