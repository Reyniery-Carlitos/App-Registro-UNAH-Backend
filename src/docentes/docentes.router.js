import Router from 'express'

import validarJWT from '../middlewars/validarJWT.js'
import { esRolAdmin, esRolAdminOJefe, esRolDocente, esRolDocenteOJefe, esRolJefeDepto } from '../middlewars/validarRoles.js'
import { ControladorDocentes } from './docentes.controller.js'

import {upload} from '../middlewars/almacenarArchivo.js'

const routerDocentes = Router()
const controladorDocente = new ControladorDocentes()

routerDocentes.post('/', 
validarJWT, 
esRolAdmin, 
upload.single('foto_empleado'), controladorDocente.crear)

routerDocentes.get('/secciones', 
validarJWT,
esRolDocenteOJefe,
controladorDocente.obtenerSeccionesPorDocente)

routerDocentes.get('/estudiantes', 
validarJWT,
esRolDocenteOJefe,
controladorDocente.obtenerEstudiantesPorSeccion)

routerDocentes.get('/info-inicio-jefe', 
validarJWT,
esRolJefeDepto,
controladorDocente.obtenerInfoInicioJefe)

routerDocentes.post('/notas', 
validarJWT,
esRolDocenteOJefe,
controladorDocente.ingresarNotasPorDocente)

routerDocentes.get('/perfil', 
validarJWT,
esRolDocenteOJefe,
controladorDocente.obtenerDocentePorNEmpleado)

routerDocentes.get('/', 
validarJWT,
esRolAdminOJefe,
controladorDocente.obtenerDocentes)

export default routerDocentes
