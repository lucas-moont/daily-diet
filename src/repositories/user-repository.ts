import { Prisma, User } from '@prisma/client'

export interface UsersRepository {
  findByEmail(email: string): Promise<User | null>
  create(data: Prisma.UserCreateInput): Promise<User>
  updateCurrentStreak(part_of_diet: boolean, id: string): Promise<void>
  findById(id: string): Promise<User | null>
  updateLongestStreak(id: string): Promise<void>
  getLongestStreak(userId: string): Promise<number>
  reUpdateStreaks(
    id: string,
    current_streak: number,
    longest_streak: number,
  ): Promise<void>
}
