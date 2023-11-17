import { StatusCodes } from 'http-status-codes'

import createPool from '../database/database.config.js'
import { fnSPGet } from '../utils/databaseFunctions.js'

const pool = await createPool()

export default class ServiceAsignaturas{
  async obtenerAsignaturasPorCarrera(usuario){
    
    const estructureSP = ["COD", "NOMBRE"]
    
    const asignaturas = await fnSPGet(pool, "ASIGNATURAS_CARRERA_JEFE", estructureSP, [usuario])

    if (asignaturas === null){
      return {
        codigoEstado: StatusCodes.BAD_REQUEST,
        mensaje: `Error al obtener asignaturas`,
        entidad: null
      }
    }

    return {
      codigoEstado: StatusCodes.OK,
      mensaje: `Asignaturas obtenidas correctamente`,
      entidad: asignaturas
    }
  }
}