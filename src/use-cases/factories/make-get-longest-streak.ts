import { PrismaUsersRepository } from "@/repositories/prisma-repositories/prisma-users-repository";
import { GetLongestStreakUseCase } from "../get-longest-streak";

export function makeGetLongestStreak() {
  const userRepository = new PrismaUsersRepository()
  const getLongestStreakUseCase = new GetLongestStreakUseCase(userRepository)

  return getLongestStreakUseCase
}