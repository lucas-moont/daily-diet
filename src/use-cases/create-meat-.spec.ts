import { CreateMealUseCase } from "./create-meal";
import { expect, beforeEach, it, describe } from "vitest";
import { InMemoryMealsRepository } from "./in-memory-repository/in-memory-meals-repository";
import { InMemoryUsersRepository } from "./in-memory-repository/in-memory-users-repository";

let userRepository: InMemoryUsersRepository
let mealRepository: InMemoryMealsRepository
let sut: CreateMealUseCase

describe('Create Meat Unit Test', () => {
  beforeEach(() => {
    userRepository = new InMemoryUsersRepository()
    mealRepository = new InMemoryMealsRepository()
    sut = new CreateMealUseCase(mealRepository, userRepository)
  })

  it('should be able to create a meal', async () => {

  })
})
