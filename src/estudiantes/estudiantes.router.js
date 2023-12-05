import { Router } from "express";
import validarJWT from '../middlewars/validarJWT.js'
import { esRolEstudiante, esRolJefeDepto} from '../middlewars/validarRoles.js'
import {ControladorEstudiantes} from "./estudiantes.controller.js";
import validarJWT2 from '../middlewars/validarJWT2.js'
import {upload} from '../middlewars/almacenarArchivo.js'

const routerEstudiantes = Router()
const controladorEstudiante = new ControladorEstudiantes()

//routerEstudiantes.post('/', controladorEstudiante.crearEstudiantes)
//routerEstudiantes.get('/')
//routerEstudiantes.get('/:id')
//routerEstudiantes.update('/:cuenta')
//routerEstudiantes.delete('/:id')


routerEstudiantes.get('/secciones',validarJWT,
esRolEstudiante,
controladorEstudiante.obtenerSeccionesPorEstudiante)

routerEstudiantes.post('/evaluacion',validarJWT,
esRolEstudiante,
controladorEstudiante.evaluarDocentePorEstudiante)

routerEstudiantes.get('/notas',validarJWT,
esRolEstudiante,
controladorEstudiante.obtenerNotasPorEstudiante)

routerEstudiantes.get('/matriculados',validarJWT,
esRolJefeDepto,
controladorEstudiante.obtenerEstudiantesMatriculados)

routerEstudiantes.get('/matricula',validarJWT,
esRolEstudiante,
controladorEstudiante.obtenerPerfilMatricula) 

routerEstudiantes.get('/clases-matricular',validarJWT,
esRolEstudiante,
controladorEstudiante.obtenerSeccionesParaMatricular)

routerEstudiantes.post('/cancelar-seccion',validarJWT,
esRolEstudiante,
controladorEstudiante.cancelarSeccionEstudiante)


routerEstudiantes.post('/adicionar-seccion',validarJWT,
esRolEstudiante,
controladorEstudiante.adicionarSeccionEstudiante)

routerEstudiantes.get('/historial-academico',validarJWT,
controladorEstudiante.obtenerHistorialAcademico)


routerEstudiantes.get('/historial-academico/jefe',validarJWT,
controladorEstudiante.obtenerHistorialAcademico2)

routerEstudiantes.post('/restablecer-clave', 
validarJWT,
controladorEstudiante.restablecerClave)

routerEstudiantes.post('/restablecer-cuenta', 
validarJWT2,
controladorEstudiante.restablecerCuenta)

routerEstudiantes.post('/cambio-carrera',validarJWT,
esRolEstudiante,
controladorEstudiante.solicitudCambioCarrea)


routerEstudiantes.post('/cambio-centro',validarJWT,
esRolEstudiante,
controladorEstudiante.solicitudCambioCentro)

routerEstudiantes.post('/cancelacion-ex',validarJWT,
esRolEstudiante,
upload.single('foto_cancelacion'),
controladorEstudiante.solicitudCancelacion)

routerEstudiantes.post('/repo',validarJWT,
esRolEstudiante,
controladorEstudiante.solicitudRepo)

routerEstudiantes.get('/obtener-solicitudes',validarJWT,
esRolEstudiante,
controladorEstudiante.obtenerSolicitudes)


routerEstudiantes.get('/perfil', 
validarJWT,
esRolEstudiante,
controladorEstudiante.obtenerPerfil)

routerEstudiantes.post('/subir-foto-perfil',
validarJWT,
esRolEstudiante,
upload.single('foto_perfil'),
controladorEstudiante.subirFotoPerfil)

routerEstudiantes.post('/agregar-descripcion', 
validarJWT,
esRolEstudiante,
controladorEstudiante.agregarDescripcion)

routerEstudiantes.get('/descargar-certificado-historial', 
validarJWT,
esRolEstudiante,
controladorEstudiante.descargarHistorial)


export default routerEstudiantes
