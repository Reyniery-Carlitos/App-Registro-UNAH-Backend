import {request, response} from 'express'
import { StatusCodes } from 'http-status-codes'

import ServiceAulas from './aulas.service.js'

const serviceAulas = new ServiceAulas()

export default class ControladorAulas{
  async obtenerAulas(req = request, res = response) {
    try {
      const {edificio} = req.query
      const {usuario} = req.usuario 
      
      const resultado = await serviceAulas.obtenerAulas({nEmpleado: usuario, edificio})

      res
      .status(resultado.codigoEstado)
      .json({
        mensaje: resultado?.mensaje,
        data: resultado.entidad
      })
    } catch(err) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Server error: ${err}`);
    }
  }
}