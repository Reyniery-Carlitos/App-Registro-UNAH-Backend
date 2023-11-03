import { Router } from "express";

import { ControladorLogin } from "./login.controller.js";

const loginRouter = Router()
const controladorLogin = new ControladorLogin()

loginRouter.post('/', controladorLogin.Login)

export default loginRouter