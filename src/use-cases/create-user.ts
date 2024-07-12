import { UsersRepository } from '@/repositories/user-repository'
import { User } from '@prisma/client'

interface CreateUserRequest {
  name: string
  email: string
  password: string
}

interface CreateUserResponse {
  user: User
}

export class createUserUseCase {
  constructor(private userUseCaseRepository: UsersRepository) {}

  execute({
    name,
    email,
    password,
  }: CreateUserRequest): Promise<CreateUserResponse> {
    const userDoesExist = await this.userUseCaseRepository.findByEmail(email)

    if (userDoesExist) {
      throw new Error('User already exists')
    }
  }
}
