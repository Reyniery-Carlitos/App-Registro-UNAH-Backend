import { Router } from "express";

import { ControladorLogin } from "./login.controller";

const loginRouter = Router()
const controladorLogin = new ControladorLogin()

loginRouter.post('/', controladorLogin.Login)

export default loginRouter