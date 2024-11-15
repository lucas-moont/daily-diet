import fastify from 'fastify'
import { userRoutes } from './http/controllers/users/routes'
import fastifyCookie from '@fastify/cookie'
import fastifyJwt from '@fastify/jwt'
import { env } from './env'
import { mealRoutes } from './http/controllers/meals/routes'
import { ZodError } from 'zod'

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
  sign: {
    expiresIn: '10m',
  },
})

app.register(fastifyCookie)

app.register(userRoutes)
app.register(mealRoutes)

app.setErrorHandler((error, request, reply) => {
  console.log('error caugh')
  if (error instanceof ZodError) {
    reply.status(400).send({
      message: 'Validation error',
      issues: error.format(),
    })
  }

  if (env.NODE_ENV !== 'production') {
    console.log(error)
  } else {
    // TODO: Here we should log an external tool like DataDog/NewRelic/Sentry
  }

  reply.status(500).send({
    message: 'Internal server error.',
  })
})
