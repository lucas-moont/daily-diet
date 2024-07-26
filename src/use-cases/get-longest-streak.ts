import { UsersRepository } from '@/repositories/user-repository'
import { ResourceNotFoundError } from './errors/resouce-not-found-error'

interface GetLongestStreakRequest {
  userId: string
}

interface GetLongestStreakResponse {
  record: number
}

export class GetLongestStreakUseCase {
  constructor(private userRepository: UsersRepository) {}

  async execute({
    userId,
  }: GetLongestStreakRequest): Promise<GetLongestStreakResponse> {
    const user = await this.userRepository.findById(userId)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    const record = await this.userRepository.getLongestStreak(userId)

    return { record }
  }
}
