import { Prisma, User } from '@prisma/client'
import { UsersRepository } from '../user-repository'
import { prisma } from '@/lib/prisma'

export class PrismaUsersRepository implements UsersRepository {
  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    })

    return user
  }

  async updateCurrentStreak(part_of_diet: boolean, id: string): Promise<void> {
    if (part_of_diet === true) {
      prisma.user.update({
        where: {
          id,
        },
        data: { current_streak: { increment: 1 } },
      })
    }
  }

  async findById(id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    })

    return user
  }

  async updateLongestStreak(id: string): Promise<void> {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    })

    await prisma.user.update({
      where: {
        id,
      },
      data: {
        longest_streak: user?.current_streak,
      },
    })
  }

  async getLongestStreak(userId: string): Promise<number> {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    })

    if (!user) {
      return 0
    }

    return user.longest_streak
  }

  async reUpdateStreaks(
    id: string,
    current_streak: number,
    longest_streak: number,
  ): Promise<void> {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    })

    if (user) {
      await prisma.user.update({
        where: { id },
        data: {
          current_streak,
          longest_streak,
        },
      })
    }
  }

  async create(data: Prisma.UserCreateInput): Promise<User> {
    const user = await prisma.user.create({
      data,
    })

    return user
  }
}
