import { UsersRepository } from '@/repositories/user-repository'
import { Meal } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resouce-not-found-error'

interface FetchMealsUseCaseRequest {
  userId: string
  page: number
}

interface FetchMealsUseCaseResponse {
  meals: Meal[]
}

export class FetchMealsUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    userId,
    page,
  }: FetchMealsUseCaseRequest): Promise<FetchMealsUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    return { meals: [] }
  }
}
