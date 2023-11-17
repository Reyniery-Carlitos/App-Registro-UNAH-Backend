import { StatusCodes } from "http-status-codes";

import {fnSPCUD, fnSPGet } from '../utils/databaseFunctions.js'

import createPool from "../database/database.config.js";
import { schemaAumentarCupos } from "./secciones.schema.js";

const pool = await createPool()

export default class ServiceSecciones{
  async obtenerSeccionesPorAsignatura({usuario, codAsig}) {
    
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

    const secciones = await fnSPGet(pool, "OBTENER_SECCIONES_ASIGNATURA", estructureSP1, [usuario, codAsig]);

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

  async aumentarCupos(data){
    const {error} = schemaAumentarCupos.validate(data)

    if (error) {
      return {
        codigoEstado: StatusCodes.BAD_REQUEST,
        mensaje: `Ocurrio un error al aumentar cupos a una nueva seccion: ${error.details[0].message}`
      };
    }

    const {cupos, seccion} = data

    const secciones = await fnSPCUD(pool, "AGRANDAR_CUPOS", [cupos, seccion])

    if (secciones.mensaje === null) {
      return {
        codigoEstado: StatusCodes.BAD_REQUEST,
        mensaje: 'No se ha podido encontrar ninguna seccion'
      }
    }

    return {
      codigoEstado: StatusCodes.OK,
      mensaje: 'Se aumentaros los cupos en las secciones con exito!'
    };
  }

  async cancelarSeccion(data) {
    const {idSeccion, justificacion} = data

    const seccion = await fnSPCUD(pool, "CANCELAR_SECCION", [idSeccion, justificacion])

    if (seccion === null) {
      return {
        codigoEstado: StatusCodes.BAD_REQUEST,
        mensaje: 'No se ha podido realizar la solicitud de cancelacion de seccion'
      }
    }

    return {
      codigoEstado: StatusCodes.OK,
      mensaje: 'Se realizo la solicitud de cancelacion de seccion correctamente'
    };
  }
}