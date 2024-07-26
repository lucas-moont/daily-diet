import { Prisma, User } from '@prisma/client'

export interface UsersRepository {
  findByEmail(email: string): Promise<User | null>
  create(data: Prisma.UserCreateInput): Promise<User>
  updateCurrentStreak(part_of_diet: boolean, id: string): void
  findById(id: string): Promise<User | null>
  updateLongestStreak(index: number): void
  getLongestStreak(userId: string): Promise<number>
}
