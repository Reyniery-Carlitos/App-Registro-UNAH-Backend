import { StatusCodes } from "http-status-codes";

import {fnSPGet } from '../utils/databaseFunctions.js'

import createPool from "../database/database.config.js";

const pool = await createPool()

export default class ServiceSecciones{
  async obtenerSeccionesPorAsignatura(cuenta) {
    const estructureSP1 = [
      "ID" ,
      "SECCION" ,
      "DOCENTE" ,
      "EDIFICIO" ,
      "AULA",
      "HORA_INICIO",
      "HORA_FINAL" ,
      "CUPOS"
     ];

    const secciones = await fnSPGet(pool, "OBTENER_SECCIONES_ASIGNATURA", estructureSP1, [cuenta]);

    if (secciones === null) {
      return {
        codigoEstado: StatusCodes.BAD_REQUEST,
        mensaje: 'No se ha podido encontrar ninguna seccion'
      }
    }

    for(let seccion of secciones) {
      const listaEspera = await fnSPGet(pool, "OBTENER_LISTA_ESPERA", ["LISTA_ESPERA"], [seccion.id]);

      seccion.LISTA_ESPERA = listaEspera[0].LISTA_ESPERA
    }

    return {
      codigoEstado: StatusCodes.OK,
      mensaje: 'Secciones obtenidas con exito!',
      entidad: secciones
    };

  }
}