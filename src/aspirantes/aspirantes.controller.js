import {request, response} from 'express'

import { AspirantesService } from "./aspirantes.service"

const serviceAspirante = new AspirantesService()

export class ControladorAspirantes{
  async crear(req = request, res = response) {
    try {
      const aspirante = req.body
  
      const resultado = serviceAspirante.crear(aspirante)

      res
        .status(StatusCodes.OK)
        .json({
          mensaje: resultado.message,
          data: { resultado: resultado.entidad }
        });
    } catch (err) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Server error: ${error}`);
    }
    
  }
}