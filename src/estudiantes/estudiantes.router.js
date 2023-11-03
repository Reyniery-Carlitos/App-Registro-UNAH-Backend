import { Router } from "express";

import { ControladorEstudiantes } from "./estudiantes.controller";

const routerEstudiantes = Router()
const controladorEstudiante = new ControladorEstudiantes()

routerEstudiantes.post('/', controladorEstudiante.crearEstudiantes)
routerEstudiantes.get('/')
routerEstudiantes.get('/:id')
routerEstudiantes.update('/:id')
routerEstudiantes.delete('/:id')

export default routerEstudiantes