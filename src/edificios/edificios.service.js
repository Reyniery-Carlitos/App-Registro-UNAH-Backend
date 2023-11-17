import { StatusCodes } from "http-status-codes"

import { fnSPGet } from "../utils/databaseFunctions.js"
import createPool from "../database/database.config.js"

const pool = await createPool()

export default class ServiceEdificios{
  async obtenerEdificios(nEmpleado){
    const estructureSP = ['ID', 'NOMBRE']
    const edificios = await fnSPGet(pool, "OBTENEREDIFICIOS", estructureSP, [nEmpleado])

    if (edificios === null) {
      return {
        codigoEstado: StatusCodes.BAD_REQUEST,
        mensaje: 'No se ha podido encontrar ningun edificio',
        entidad: null
      }
    }

    return {
      codigoEstado: StatusCodes.OK,
      mensaje: 'Edificios obtenidos con exito!',
      entidad: edificios
    };
  }
}