import { StatusCodes } from "http-status-codes"

import { LoginService } from "./login.service"

const loginService = new LoginService()

export class ControladorLogin{
  async Login (req, res) {
    try {
      const {username, contrasenia} = req.body

      if (username === undefined || contrasenia === undefined) {
        res.status(StatusCodes.BAD_REQUEST).send('Por favor ingrese su usuario y contrasenia')
      }

      const resultado = await loginService.login(req.body)

      res
        .status(StatusCodes.OK)
        .json({
          mensaje: resultado.message,
          data: { token: resultado.token, resultado: resultado.entidad }
        });
    }catch (err) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Error de servidor: ${err}`);
    }
  }
}