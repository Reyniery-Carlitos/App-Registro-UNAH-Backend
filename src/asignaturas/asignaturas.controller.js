import { request, response } from "express"
import { StatusCodes } from "http-status-codes"

import ServiceAsignaturas from "./asignaturas.service.js"

const serviceAsignaturas = new ServiceAsignaturas()

export default class ControladorAsignaturas{
  async obtenerAsignaturasPorCarrera(req = request, res = response){
    try{
      const {usuario} = req.usuario
      
      const resultado = await serviceAsignaturas.obtenerAsignaturasPorCarrera(usuario)

      res
      .status(resultado.codigoEstado)
      .json({
        mensaje: resultado?.mensaje,
        data: resultado.entidad
      })
    }catch(err){
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Server error: ${err}`);
    }
  }
}