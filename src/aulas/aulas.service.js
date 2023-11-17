import { StatusCodes } from "http-status-codes"

import createPool from '../database/database.config.js'
import {fnSPGet} from '../utils/databaseFunctions.js'

const pool = await createPool()

export default class ServiceAulas{
  async obtenerAulas({nEmpleado, edificio}) {
    const estructureSP = ['ID', 'NOMBRE']
    const aulas = await fnSPGet(pool, "ObtenerAulas", estructureSP, [nEmpleado, edificio])

    if (aulas === null) {
      return {
        codigoEstado: StatusCodes.BAD_REQUEST,
        mensaje: 'No se ha podido encontrar ningun aula',
        entidad: null
      }
    }

    return {
      codigoEstado: StatusCodes.OK,
      mensaje: 'Aulas obtenidas con exito!',
      entidad: aulas
    };
  }
}