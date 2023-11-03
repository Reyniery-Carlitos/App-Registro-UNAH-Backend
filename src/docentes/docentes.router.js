import Router from 'express'

import validarJWT from '../middlewars/validarJWT.js'
import { esAdminRole } from '../middlewars/validarRoles.js'
import { ControladorDocentes } from './docentes.controller.js'

const docentesRouter = Router()
const controladorDocente = new ControladorDocentes()

// Crear nuevo docente
docentesRouter.post('/', validarJWT, esAdminRole, controladorDocente.crear)

export default docentesRouter