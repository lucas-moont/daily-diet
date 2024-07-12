import { UsersRepository } from '@/repositories/user-repository'
import { User } from '@prisma/client'
import { EmailAlreadyRegistered } from './errors/email-already-registered-error'
import { hash } from 'bcryptjs'

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

  async execute({
    name,
    email,
    password,
  }: CreateUserRequest): Promise<CreateUserResponse> {
    const userDoesExist = await this.userUseCaseRepository.findByEmail(email)

    if (userDoesExist) {
      throw new EmailAlreadyRegistered()
    }

    const password_hash = await hash(password, 6)

    const user = await this.userUseCaseRepository.create({
      name,
      email,
      password_hash,
    })

    return {
      user,
    }
  }
}
