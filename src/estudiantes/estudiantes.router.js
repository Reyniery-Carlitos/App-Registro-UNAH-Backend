import { Router } from "express";
import validarJWT from '../middlewars/validarJWT.js'
import { esRolEstudiante, esRolJefeDepto} from '../middlewars/validarRoles.js'
import {ControladorEstudiantes} from "./estudiantes.controller.js";

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
esRolJefeDepto,
controladorEstudiante.obtenerHistorialAcademico)


export default routerEstudiantes
