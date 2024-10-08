import { UsersRepository } from '@/repositories/user-repository'
import { Prisma, User } from '@prisma/client'
import { randomUUID } from 'crypto'

export class InMemoryUsersRepository implements UsersRepository {
  users: User[] = []

  async create(data: Prisma.UserCreateInput) {
    const user = {
      id: data.id ?? randomUUID(),
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      created_at: new Date(),
      current_streak: data.current_streak ?? 0,
      longest_streak: data.longest_streak ?? 0,
    }

    this.users.push(user)

    return user
  }

  async findByEmail(email: string) {
    const userFound = this.users.find((user) => user.email === email)

    if (!userFound) {
      return null
    }

    return userFound
  }

  async findById(id: string) {
    const userFound = this.users.find((user) => user.id === id)

    if (!userFound) {
      return null
    }

    return userFound
  }

  async updateCurrentStreak(part_of_diet: boolean, id: string) {
    const userIndex = this.users.findIndex((user) => user.id === id)
    if (part_of_diet === true) {
      this.users[userIndex].current_streak++
      if (
        this.users[userIndex].current_streak >
        this.users[userIndex].longest_streak
      ) {
        this.updateLongestStreak(id)
      }
    } else {
      this.users[userIndex].current_streak = 0
    }
  }

  async updateLongestStreak(id: string) {
    const userIndex = this.users.findIndex((user) => user.id === id)

    if (userIndex !== -1) {
      this.users[userIndex].longest_streak =
        this.users[userIndex].current_streak
    }
  }

  async reUpdateStreaks(
    id: string,
    current_streak: number,
    longest_streak: number,
  ) {
    const userIndex = await this.users.findIndex((user) => user.id === id)

    if (userIndex !== -1) {
      this.users[userIndex].current_streak = current_streak
      this.users[userIndex].longest_streak = longest_streak
    }
  }

  async getLongestStreak(userId: string) {
    const record = this.users.find((user) => user.id === userId)?.longest_streak
    if (!record) {
      return 0
    }

    return record
  }
}
