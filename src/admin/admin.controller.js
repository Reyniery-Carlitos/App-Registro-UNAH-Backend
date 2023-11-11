import {request, response} from 'express'
import { StatusCodes } from 'http-status-codes'

import { AdminService } from "./admin.service.js"

const serviceAdmin = new AdminService()

export class ControladorAdmin{
  async registrarEstudiantes(req = request, res = response) {
    try {
      const archivo = req.file.filename
      const resultado = await serviceAdmin.registrarEstudiantes(archivo)

      res
      .status(resultado.codigoEstado)
      .json({
        mensaje: resultado?.mensaje
      })
    } catch(err){
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Server error: ${err}`);
    }
  }

  async configurarPeriodo(req = request, res = response) {
    try {
      const resultado = await serviceAdmin.configurarPeriodo(req.body)

      res
      .status(resultado.codigoEstado)
      .json({
        mensaje: resultado?.mensaje
      })
    } catch(err) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Server error: ${err}`);
    }
  }
}