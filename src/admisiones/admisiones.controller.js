import {request, response} from 'express'
import { StatusCodes } from "http-status-codes";

import ServiceAdmisiones from './admisiones.service.js';

const serviceAdmisiones = new ServiceAdmisiones() 

export default class ControladorAdmisiones {
  async cargarNotas(req = request, res = response) {
    try {
      const archivo = req.file.filename
      const resultado = await serviceAdmisiones.cargarNotas(archivo)

      res
      .status(resultado.codigoEstado)
      .json({
        mensaje: resultado.mensaje
      })
    } catch(err){
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Server error: ${err}`);
    }
  }

}