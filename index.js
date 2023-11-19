import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import cors from 'cors'
import path from 'node:path'

import bodyParser from 'body-parser'
const { json } = bodyParser

import routerLogin from './src/login/login.router.js'
import routerDocentes from './src/docentes/docentes.router.js'
import routerAspirantes from './src/aspirantes/aspirantes.router.js'
import routerAdmin from './src/admin/admin.router.js'
import routerCentros from './src/centros/centros.router.js'
import routerAdmisiones from './src/admisiones/admisiones.router.js'
import routerCarreras from './src/carreras/carreras.router.js'
import routerRoles from './src/roles/roles.router.js'
import routerSecciones from './src/secciones/secciones.router.js'
import routerAsignaturas from './src/asignaturas/asignaturas.router.js'
import routerEdificios from './src/edificios/edificios.router.js'
import routerAulas from './src/aulas/aulas.router.js'
import routerEstudiantes from './src/estudiantes/estudiantes.router.js'

const app = express()
const PUERTO = process.env.PORT ?? 3002

// Middlewars
app.use(cors())
app.use(helmet())
app.use(morgan('tiny'))
app.use(json())

// Middleware para servir las imagenes como recursos estaticos
app.use('/public', express.static(path.join(process.cwd(), 'src', 'public', 'uploads')))

// Endpoints
app.use('/api/v1/admin', routerAdmin)
app.use('/api/v1/login', routerLogin)
app.use('/api/v1/docentes', routerDocentes)
app.use('/api/v1/aspirantes', routerAspirantes)
app.use('/api/v1/centros', routerCentros)
app.use('/api/v1/admisiones', routerAdmisiones)
app.use('/api/v1/carreras/', routerCarreras)
app.use('/api/v1/roles', routerRoles)
app.use('/api/v1/secciones', routerSecciones)
app.use('/api/v1/asignaturas', routerAsignaturas)
app.use('/api/v1/edificios/', routerEdificios)
app.use('/api/v1/aulas', routerAulas)
app.use('/api/v1/estudiante', routerEstudiantes)

// Listen
app.listen(PUERTO, () => {
  console.log(`Servidor escuchando en el puerto: ${PUERTO}`)
})
