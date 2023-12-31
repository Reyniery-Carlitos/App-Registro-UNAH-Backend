import {request, response} from 'express'
import { StatusCodes } from "http-status-codes"

import { LoginService } from "./login.service.js"

const loginService = new LoginService()

export class ControladorLogin{
  async Login (req = request, res = response) {
    try {
      const {username, contrasenia} = req.body

      if (username === undefined || contrasenia === undefined) {
        res.status(StatusCodes.BAD_REQUEST).send('Por favor ingrese su usuario y contrasenia')
      }

      const resultado = await loginService.login(req.body)

      res
        .status(resultado.codigoEstado)
        // .header('x-token', resultado.token)
        .json({
          mensaje: resultado.mensaje,
          data:  resultado.entidad,
          token: resultado.token
        });

    }catch (err) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Error de servidor: ${err}`);
    }
  }
}