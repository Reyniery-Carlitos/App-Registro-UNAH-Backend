import {request, response} from 'express'
import { StatusCodes } from 'http-status-codes'

import { AdminService } from "./admin.service.js"

const serviceAdmin = new AdminService()

export class ControladorAdmin{
  async ingresarNotasAspirantes(req = request, res = response) {
    try {
      const archivo = req.file.filename
      const resultado = await serviceAdmin.ingresarNotasAspirantes(archivo)

      res
      .status(StatusCodes.OK)
      .json({
        mensaje: resultado.mensaje
      })
    } catch(err){
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Server error: ${err}`);
    }
  }

  async registrarEstudiantes(req = request, res = response) {
    try {
      const archivo = req.file.filename
      const resultado = await serviceAdmin.registrarEstudiantes(archivo)

      res
      .status(StatusCodes.OK)
      .json({
        mensaje: resultado?.mensaje
      })
    } catch(err){
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Server error: ${err}`);
    }
  }
}