import { Router } from "express";

import ControladorRoles from "./roles.controller.js";

const routerRoles = Router()
const controladorRoles = new ControladorRoles()

routerRoles.get('/', controladorRoles.obtenerRoles)

export default routerRoles