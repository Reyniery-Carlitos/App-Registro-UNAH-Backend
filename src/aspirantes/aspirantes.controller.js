import {request, response} from 'express'
import { StatusCodes } from 'http-status-codes'

import { AspirantesService } from "./aspirantes.service.js"

const serviceAspirante = new AspirantesService()

export class ControladorAspirantes{
  async crear(req = request, res = response) {
    try {
      const aspirante = req.body
  
      const resultado = await serviceAspirante.crear(aspirante)

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