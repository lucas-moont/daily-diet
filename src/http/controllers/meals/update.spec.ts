/* eslint-disable @typescript-eslint/no-explicit-any */
import request from 'supertest'
import { beforeAll, afterAll, beforeEach, describe, it, expect } from 'vitest'
import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/tests/create-and-authenticate-user'
import { createMeal } from '@/utils/tests/create-meal'
import { prisma } from '@/lib/prisma'

let token: string
let meal: any

beforeAll(async () => {
  app.ready()
})

afterAll(async () => {
  app.close()
})

beforeEach(async () => {
  await prisma.meal.deleteMany({})
  await prisma.user.deleteMany({})
  ;({ token } = await createAndAuthenticateUser(app)) // Recria o usuário e o token
  await createMeal(app, token, true)
  await createMeal(app, token, true)
  meal = await createMeal(app, token, true) // Recria a refeição para este teste
})

describe('e2e tests for updating meal', () => {
  it('should be able to update name of meal', async () => {
    const response = await request(app.server)
      .put(`/meal/${meal.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Alterado',
      })
    const { updatedMeal } = response.body

    expect(response.statusCode).toBe(200)
    expect(updatedMeal).toEqual(
      expect.objectContaining({
        name: 'Alterado',
        description: 'Blablabla',
        part_of_diet: true,
      }),
    )
  })

  it('should be able to update description of meal', async () => {
    const response = await request(app.server)
      .put(`/meal/${meal.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        description: 'Alterado',
      })
    const { updatedMeal } = response.body

    expect(response.statusCode).toBe(200)
    expect(updatedMeal).toEqual(
      expect.objectContaining({
        name: 'Comida qualquer',
        description: 'Alterado',
        part_of_diet: true,
      }),
    )
  })

  it('should be able to update if meal is part of diet negatively', async () => {
    const response = await request(app.server)
      .put(`/meal/${meal.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        part_of_diet: false,
      })
    const { updatedMeal } = response.body

    expect(response.statusCode).toBe(200)
    expect(updatedMeal).toEqual(
      expect.objectContaining({
        name: 'Comida qualquer',
        description: 'Blablabla',
        part_of_diet: false,
      }),
    )

    const responseMetrics = await request(app.server)
      .get('/metrics')
      .set('Authorization', `Bearer ${token}`)
      .send()

    const { metrics } = responseMetrics.body

    expect(metrics).toEqual(
      expect.objectContaining({
        totalOfMeals: 3,
        partOfDietMealsQnt: 2,
        offTheDietMealsQnt: 1,
        bestStreak: 2,
        currentStreak: 0,
      }),
    )
  })

  it('should be able to update if meal is part of diet positively', async () => {
    meal = await createMeal(app, token, false) // Recria a refeição para este teste

    const response = await request(app.server)
      .put(`/meal/${meal.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        part_of_diet: true,
      })
    const { updatedMeal } = response.body

    expect(response.statusCode).toBe(200)
    expect(updatedMeal).toEqual(
      expect.objectContaining({
        name: 'Comida qualquer',
        description: 'Blablabla',
        part_of_diet: true,
      }),
    )

    const responseMetrics = await request(app.server)
      .get('/metrics')
      .set('Authorization', `Bearer ${token}`)
      .send()

    const { metrics } = responseMetrics.body

    expect(metrics).toEqual(
      expect.objectContaining({
        totalOfMeals: 4,
        partOfDietMealsQnt: 4,
        offTheDietMealsQnt: 0,
        bestStreak: 4,
        currentStreak: 4,
      }),
    )
  })
})
