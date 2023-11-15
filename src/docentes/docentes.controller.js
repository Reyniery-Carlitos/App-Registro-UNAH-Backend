import {request, response} from 'express'
import { StatusCodes } from 'http-status-codes'

import { DocentesService } from "./docentes.service.js"

const docenteService = new DocentesService()

export class ControladorDocentes {
  async crear (req = request, res = response) {
    try {
      const infoDocente = req.body
      const docente = {...infoDocente, foto_empleado: '/public/' + req.file.filename}
      console.log(infoDocente)

      const resultado = await docenteService.crear(docente)

      res
        .status(resultado.codigoEstado)
        .json({
          mensaje: resultado.mensaje
        });
    } catch (err) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Server error: ${err}`);
    }
  }

  async obtenerDocentes(req = request, res = response) {
    try {
      const resultado = await docenteService.obtenerDocentes()

      res
        .status(resultado.codigoEstado)
        .json({
          mensaje: resultado.mensaje,
          data: resultado.entidad
        });
    } catch (err) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Server error: ${err}`);
    }
  }

  async obtenerDocentePorNEmpleado(req = request, res = response) {
    try {
      const nEmpleado = req.params.nEmpleado
      console.log(nEmpleado)
      const resultado = await docenteService.obtenerDocentePorNEmpleado(nEmpleado)

      res
        .status(resultado.codigoEstado)
        .json({
          mensaje: resultado.mensaje,
          data: resultado.entidad
        });
    } catch (err) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Server error: ${err}`);
    }
  }
}