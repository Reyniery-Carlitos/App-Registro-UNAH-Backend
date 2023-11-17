import Router from 'express'

import validarJWT from '../middlewars/validarJWT.js'
import { esRolAdmin, esRolAdminOJefe, esRolDocente } from '../middlewars/validarRoles.js'
import { ControladorDocentes } from './docentes.controller.js'

import {upload} from '../middlewars/almacenarArchivo.js'

const routerDocentes = Router()
const controladorDocente = new ControladorDocentes()

// Crear nuevo docente
routerDocentes.post('/', 
validarJWT, 
esRolAdmin, 
upload.single('foto_empleado'), controladorDocente.crear)

routerDocentes.get('/:nEmpleado', 
// validarJWT,
// esRolDocente,
controladorDocente.obtenerDocentePorNEmpleado)

routerDocentes.get('/', 
// validarJWT,
// esRolAdminOJefe,
controladorDocente.obtenerDocentes)

export default routerDocentes