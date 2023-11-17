import { request, response } from "express";
import { StatusCodes } from "http-status-codes";

import ServiceSecciones from "./secciones.service.js";

const serviceSecciones = new ServiceSecciones()

export default class ControladorSecciones {
  async obtenerSeccionesPorAsignatura(req = request, res = response) {
    try {
      const cuenta = req.query.cuenta
      const resultado = await serviceSecciones.obtenerSeccionesPorAsignatura(cuenta)

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

  async aumentarCupos(req = request, res = response){
    try {
      const data = req.body
      const resultado = await serviceSecciones.aumentarCupos(data)

      res
        .status(resultado.codigoEstado)
        .json({
          mensaje: resultado.mensaje
        });
    } catch (err) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Server error: ${err}`);
    }
  }
}