import { Router } from "express";
import { ControladorAspirantes } from "./aspirantes.controller.js";

const routerAspirantes = Router()
const controladorAspirante = new ControladorAspirantes()

routerAspirantes.post('/', controladorAspirante.crear)

export default routerAspirantes