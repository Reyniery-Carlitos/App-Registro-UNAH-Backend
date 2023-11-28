import Router from 'express'

import validarJWT from '../middlewars/validarJWT.js'
import { esRolAdmin, esRolAdminOJefe, esRolDocente, esRolDocenteOJefe, esRolJefeDepto,esRolEstudiante } from '../middlewars/validarRoles.js'
import { ControladorDocentes } from './docentes.controller.js'

import {upload} from '../middlewars/almacenarArchivo.js'
import validarJWT2 from '../middlewars/validarJWT2.js'

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



routerDocentes.get('/secciones-docente', 
validarJWT,
esRolJefeDepto,
controladorDocente.obtenerSeccionesPorDocente2)

routerDocentes.get('/evaluaciones-docentes', 
validarJWT,
esRolJefeDepto,
controladorDocente.obtenerEvaluacionesaDocentes)

routerDocentes.get('/estadisticas', 
validarJWT,
esRolJefeDepto,
controladorDocente.obtenerEstadisticas)


routerDocentes.post('/restablecer-clave', 
validarJWT,
esRolJefeDepto,
controladorDocente.restablecerClave)

routerDocentes.post('/restablecer-cuenta', 
validarJWT2,
controladorDocente.restablecerCuenta)

routerDocentes.get('/perfil-docente', 
validarJWT,
esRolEstudiante,
controladorDocente.obtenerPerfilDocente)



export default routerDocentes
