import { Router } from "express";

import ControladorCentros from "./centros.controller.js";

const routerCentros = Router()
const controladorCentros = new ControladorCentros()

routerCentros.get('/carreras/:idCarrera', controladorCentros.obtenerCentrosPorIdCarrera)
routerCentros.get('/', controladorCentros.obtenerCentros)


export default routerCentros