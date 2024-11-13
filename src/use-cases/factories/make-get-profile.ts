import { PrismaUsersRepository } from '@/repositories/prisma-repositories/prisma-users-repository'
import { GetUserProfileUseCase } from '../get-user-profile'

export function makeGetProfile() {
  const userRepository = new PrismaUsersRepository()
  const getProfileUseCase = new GetUserProfileUseCase(userRepository)
  return getProfileUseCase
}
