import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import cors from 'cors'

import bodyParser from 'body-parser'
const { json } = bodyParser

import userRouter from './src/users/user.router.js'

const app = express()
const PORT = process.env.PORT ?? 3000

// Middlewars
app.use(cors())
app.use(helmet())
app.use(morgan('tiny'))
app.use(json())

// Endpoints
app.use('/api/v1/users', userRouter)

// Listen
app.listen(PORT, () => {
  console.log(`Server listen on port : ${PORT}`)
})