import { PrismaUsersRepository } from '@/repositories/prisma-repositories/prisma-users-repository'
import { CreateUserUseCase } from '../create-user'

export async function makeCreateUserService() {
  const userRepository = new PrismaUsersRepository()
  const createUserUseCase = new CreateUserUseCase(userRepository)

  return createUserUseCase
}
