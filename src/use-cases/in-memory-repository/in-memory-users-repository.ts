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
}
