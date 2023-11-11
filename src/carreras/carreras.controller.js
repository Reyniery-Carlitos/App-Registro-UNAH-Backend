import { request, response } from "express";

import ServiceCarreras from "./carreras.service.js";

const serviceCarreras = new ServiceCarreras()

export default class ControladorCarreras{
  async obtenerCarreras(req = request, res = response) {
    try {
      const resultado = await serviceCarreras.obtenerCarreras()

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