import { request, response } from "express";
import { StatusCodes } from "http-status-codes";

import ServiceCarreras from "./carreras.service.js";

const serviceCarreras = new ServiceCarreras()

export default class ControladorCarreras{
  async obtenerCarreras(req = request, res = response) {
    try {
      const {idCentro} = req.query
      let resultado = ''
      if(idCentro) {
        resultado = await serviceCarreras.obtenerCarrerasPorCentro(idCentro)
      } else {
        resultado = await serviceCarreras.obtenerCarreras()
      }

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

  // async obtenerCarrerasPorCentro(req = request, res = response) {
  //   try{
  //     const {idCentro} = req.params
  //     const resultado = await serviceCarreras.obtenerCarrerasPorCentro(idCentro)

  //     res
  //     .status(resultado.codigoEstado)
  //     .json({
  //       mensaje: resultado.mensaje,
  //       data: resultado.entidad
  //     })
  //   }catch(err){
  //     res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Server error: ${err}`);
  //   }
  // }
}