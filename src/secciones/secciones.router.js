import { Router } from "express"

import ControladorSecciones from "./secciones.controller.js"
import validarJWT from "../middlewars/validarJWT.js"
import { esRolJefeDepto } from "../middlewars/validarRoles.js"

const seccionesRouter = Router()
const controladorSecciones = new ControladorSecciones()

seccionesRouter.post('/aumentar-cupos', 
validarJWT,
esRolJefeDepto,
controladorSecciones.aumentarCupos)

seccionesRouter.post('/cancelar-seccion', 
validarJWT,
esRolJefeDepto,
controladorSecciones.cancelarSeccion)

seccionesRouter.get('/', 
validarJWT,
esRolJefeDepto,
controladorSecciones.obtenerSeccionesPorAsignatura)

export default seccionesRouter