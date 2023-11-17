import { Router } from "express"

import ControladorEdificios from "./edificios.controller.js"
import validarJWT from "../middlewars/validarJWT.js"
import { esRolJefeDepto } from "../middlewars/validarRoles.js"

const routerEdificios = Router()
const controladorEdificios = new ControladorEdificios()

routerEdificios.get('/', 
validarJWT,
esRolJefeDepto,
controladorEdificios.obtenerEdificios)

export default routerEdificios