import { Router } from "express";

import ControladorSecciones from "./secciones.controller.js";

const seccionesRouter = Router()
const controladorSecciones = new ControladorSecciones()

seccionesRouter.get('/', controladorSecciones.obtenerSeccionesPorAsignatura)

export default seccionesRouter