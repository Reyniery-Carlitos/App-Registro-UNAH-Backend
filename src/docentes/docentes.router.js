import Router from 'express'

import validarJWT from '../middlewars/validarJWT.js'
import { esRolAdmin } from '../middlewars/validarRoles.js'
import { ControladorDocentes } from './docentes.controller.js'

const routerDocentes = Router()
const controladorDocente = new ControladorDocentes()

// Crear nuevo docente
routerDocentes.post('/', validarJWT, esRolAdmin, controladorDocente.crear)

export default routerDocentes