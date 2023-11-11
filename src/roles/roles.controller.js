import { request, response } from "express";
import { StatusCodes } from "http-status-codes";

import ServiceRol from "./roles.service.js";

const serviceRol = new ServiceRol()

export default class ControladorRoles {
  async obtenerRoles(req = request, res = response) {
    try{
      const resultado = await serviceRol.obtenerRoles()

      res
      .status(resultado.codigoEstado)
      .json({
        mensaje: resultado.mensaje,
        data: resultado.entidad
      })
    }catch(err){
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Server error: ${err}`);
    }
  }
}