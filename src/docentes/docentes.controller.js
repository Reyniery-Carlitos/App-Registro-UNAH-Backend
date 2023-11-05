import {request, response} from 'express'
import { StatusCodes } from 'http-status-codes'

import { DocentesService } from "./docentes.service.js"

const docenteService = new DocentesService()

export class ControladorDocentes {
  async crear (req = request, res = response) {
    try {
      const docente = req.body

      const resultado = await docenteService.crear(docente)

      res
        .status(StatusCodes.OK)
        .json({
          mensaje: resultado.mensaje
        });
    } catch (err) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Server error: ${err}`);
    }
  }
}