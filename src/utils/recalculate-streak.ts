import { Meal } from '@prisma/client'

export async function recalculateStreak(
  meals: Meal[],
): Promise<{ currentStreak: number; longestStreak: number }> {
  let currentStreak = 0
  let longestStreak = 0

  for (const meal of meals) {
    if (meal.part_of_diet) {
      currentStreak++
      if (currentStreak > longestStreak) {
        longestStreak = currentStreak
      }
    } else {
      currentStreak = 0
    }
  }

  return { currentStreak, longestStreak }
}
