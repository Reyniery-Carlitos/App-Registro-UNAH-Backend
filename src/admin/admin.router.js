import { Router } from "express";

import { ControladorAdmin } from "./admin.controller.js";
import validarJWT from "../middlewars/validarJWT.js";
import { esRolAdmin } from "../middlewars/validarRoles.js"; 

const routerAdmin = Router()
const controladorAdmin = new ControladorAdmin()

routerAdmin.post('/configuracion-periodo', 
validarJWT,
esRolAdmin,
controladorAdmin.configurarPeriodo)

export default routerAdmin