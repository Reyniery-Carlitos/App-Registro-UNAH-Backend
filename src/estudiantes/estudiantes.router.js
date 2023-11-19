import { Router } from "express";
import validarJWT from '../middlewars/validarJWT.js'
import { esRolEstudiante } from '../middlewars/validarRoles.js'
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


export default routerEstudiantes
