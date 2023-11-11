import { Router } from "express";

import ControladorCentros from "./centros.controller.js";

const routerCentros = Router()
const controladorCentros = new ControladorCentros()

routerCentros.get('/', controladorCentros.obtenerCentros)

export default routerCentros