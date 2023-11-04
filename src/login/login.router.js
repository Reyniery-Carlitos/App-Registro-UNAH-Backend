import { Router } from "express";

import { ControladorLogin } from "./login.controller.js";

const routerLogin = Router()
const controladorLogin = new ControladorLogin()

routerLogin.post('/', controladorLogin.Login)

export default routerLogin