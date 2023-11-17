import { Router } from "express"

import ControladorAulas from "./aulas.controller.js"
import validarJWT from '../middlewars/validarJWT.js'
import {esRolJefeDepto} from '../middlewars/validarRoles.js'

const routerAulas = Router()
const controladorAulas = new ControladorAulas()

routerAulas.get('/', 
validarJWT,
esRolJefeDepto,
controladorAulas.obtenerAulas)

export default routerAulas