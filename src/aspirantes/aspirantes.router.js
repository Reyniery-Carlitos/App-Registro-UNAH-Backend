import { Router } from "express";


const routerAspirantes = Router()


routerAspirantes.post('/', controladorAspirante)

export default routerAspirantes