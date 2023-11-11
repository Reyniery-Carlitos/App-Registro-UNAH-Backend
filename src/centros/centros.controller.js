import { request, response } from "express";
import { StatusCodes } from "http-status-codes";

import CentrosService from "./centros.service.js";

const serviceCentros = new CentrosService()

export default class ControladorCentros {
  async obtenerCentros(req = request, res = response) {
    try {
      const resultado = await serviceCentros.obtenerCentros()

      res
      .status(resultado.codigoEstado)
      .json({
        mensaje: resultado.mensaje,
        data: resultado.entidad
      })
    } catch(err) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Server error: ${err}`);
    }
  }
}