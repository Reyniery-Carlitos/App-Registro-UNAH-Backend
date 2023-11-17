import { Router } from "express"

import ControladorAsignaturas from "./asignaturas.controller.js"
import validarJWT from "../middlewars/validarJWT.js"
import { esRolJefeDepto } from "../middlewars/validarRoles.js"

const routerAsignaturas = Router()
const controladorAsignaturas = new ControladorAsignaturas()

routerAsignaturas.get('/', 
validarJWT,
esRolJefeDepto,
controladorAsignaturas.obtenerAsignaturasPorCarrera)

export default routerAsignaturas