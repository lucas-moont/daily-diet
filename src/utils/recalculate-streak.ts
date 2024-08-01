import { Meal } from '@prisma/client'

export async function recalculateStreak(
  meals: Meal[],
): Promise<{ current_streak: number; longest_streak: number }> {
  let current_streak = 0
  let longest_streak = 0

  for (const meal of meals) {
    if (meal.part_of_diet) {
      current_streak++
      if (current_streak > longest_streak) {
        longest_streak = current_streak
      }
    } else {
      current_streak = 0
    }
  }

  return { current_streak, longest_streak }
}
