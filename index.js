import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import cors from 'cors'

import bodyParser from 'body-parser'
const { json } = bodyParser

import routerLogin from './src/login/login.router.js'
import routerDocentes from './src/docentes/docentes.router.js'
import routerAspirantes from './src/aspirantes/aspirantes.router.js'
// import libroRouter from './src/libros/libros.router.js'
// import routerEstudiantes from './src/estudiantes/estudiantes.router.js'

const app = express()
const PUERTO = process.env.PORT ?? 3002

// Middlewars
app.use(cors())
app.use(helmet())
app.use(morgan('tiny'))
app.use(json())

// Endpoints
// app.use('/api/v1/users', userRouter)
// app.use('/api/v1/libros', libroRouter)
app.use('/api/v1/login', routerLogin)
app.use('/api/v1/docentes', routerDocentes)
app.use('/api/v1/aspirantes', routerAspirantes)
// app.use('/api/v1/estudiantes', routerEstudiantes)

// Listen
app.listen(PUERTO, () => {
  console.log(`Servidor escuchando en el puerto: ${PUERTO}`)
})