import Router from 'express'

import validarJWT from '../middlewars/validarJWT.js'
import { esRolAdmin } from '../middlewars/validarRoles.js'
import { ControladorDocentes } from './docentes.controller.js'

import upload from '../middlewars/almacenarArchivo.js'

const routerDocentes = Router()
const controladorDocente = new ControladorDocentes()
// validarJWT, esRolAdmin,
// Crear nuevo docente
routerDocentes.post('/', validarJWT, esRolAdmin, upload.single('foto_empleado'), controladorDocente.crear)

export default routerDocentes