import Router from 'express'

import validarJWT from '../middlewars/validarJWT.js'
import { esRolAdmin, esRolAdminOJefe, esRolDocente, esRolDocenteOJefe, esRolJefeDepto,esRolEstudiante} from '../middlewars/validarRoles.js'
import { ControladorDocentes } from './docentes.controller.js'

import {upload, uploadVideo} from '../middlewars/almacenarArchivo.js'
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

controladorDocente.obtenerPerfilDocente)


routerDocentes.get('/descargar-estudiantes', 
validarJWT,
esRolDocenteOJefe,
controladorDocente.descargarEstudiantesPorSeccion)

routerDocentes.get('/descargar-planificacion/excel', 
validarJWT,
controladorDocente.descargarPlanificacion)


routerDocentes.get('/descargar-planificacion/pdf', 
validarJWT,
controladorDocente.descargarPlanificacion2)

routerDocentes.get('/obtener-cambio-car', 
validarJWT,
controladorDocente.obtenerSolicitudesCambioCar)

routerDocentes.get('/obtener-cambio-centro', 
validarJWT, 
controladorDocente.obtenerSolicitudesCambioCentro) 

routerDocentes.get('/visualizar-planificacion', 
validarJWT,
controladorDocente.visualizarPlanificacion)

routerDocentes.post('/actualizacion/cambio-centro', 
validarJWT,
controladorDocente.actualizarSolicitudCambioCentro)

routerDocentes.post('/actualizacion/cambio-carrera', 
validarJWT,
controladorDocente.actualizarSolicitudCambioCarrera)

routerDocentes.post('/actualizacion/cancelacion-excepcional', 
validarJWT,
controladorDocente.actualizarSolicitudCancelacion)

routerDocentes.get('/obtener-cancelaciones-excepcionales', 
validarJWT,
controladorDocente.obtenerCancelacionesExcepcionales)

routerDocentes.post('/subir-video',
  validarJWT,
  uploadVideo.single('video'),
  controladorDocente.subirVideo
)




export default routerDocentes
  