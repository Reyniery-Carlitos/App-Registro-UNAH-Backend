import { Router } from "express";

import ControladorCarreras from "./carreras.controller.js";

const routerCarreras = Router()
const controladorCarreras = new ControladorCarreras()

routerCarreras.get('/centros/:idCentro', controladorCarreras.obtenerCarrerasPorCentro)
routerCarreras.get('/', controladorCarreras.obtenerCarreras)

export default routerCarreras