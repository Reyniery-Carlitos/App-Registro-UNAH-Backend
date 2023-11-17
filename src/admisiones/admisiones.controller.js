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

  async registrarEstudiantes(req = request, res = response) {
    try {
      const archivo = req.file.filename
      const resultado = await serviceAdmisiones.registrarEstudiantes(archivo)

      res
      .status(resultado.codigoEstado)
      .json({
        mensaje: resultado?.mensaje
      })
    } catch(err){
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Server error: ${err}`);
    }
  }

  async obtenerCsvAspirantesAprobados(req = request, res = response) {
    try { 
      // Debe obtener la info de la base de datos de los aspirantes aprobados
      const resultado = await serviceAdmisiones.obtenerCsvAspirantesAprobados()

      res
      .status(resultado.codigoEstado)
      .sendFile(resultado.entidad)
    } catch(err) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Server error: ${err}`);
    }
  }

}