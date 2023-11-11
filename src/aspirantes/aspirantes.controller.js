import {request, response} from 'express'
import { StatusCodes } from 'http-status-codes'

import { AspirantesService } from "./aspirantes.service.js"

const serviceAspirante = new AspirantesService()

export class ControladorAspirantes{
  async crear(req = request, res = response) {
    try {
      const infoAspirante = req.body

      const aspirante = {...infoAspirante, foto_certificado: req.file.filename}
      console.log(aspirante)
  
      const resultado = await serviceAspirante.crear(aspirante)

      res
        .status(resultado.codigoEstado)
        .json({
          mensaje: resultado.mensaje
        });
    } catch (err) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Server error: ${err}`);
    }
  }

  async obtenerPorDni(req = request, res = response) {
    try {
      const dni = req.params.dni

      const resultado = await serviceAspirante.obtenerDatosPorId(dni)

      res
      .status(resultado.codigoEstado)
      .json({
        mensaje: resultado.mensaje,
        data: resultado.entidad
      })
    } catch(err){
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Server error: ${err}`);
    }
  }
}
