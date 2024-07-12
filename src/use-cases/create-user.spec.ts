import {it, beforeAll, afterAll, describe} from 'vitest'
import { CreateUserUseCase } from './create-user'
import { InMemoryUsersRepository } from './in-memory-repository/in-memory-users-repository'

let usersRepository: InMemoryUsersRepository
let sut: CreateUserUseCase

