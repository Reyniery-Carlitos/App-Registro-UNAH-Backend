import OracleDB from "oracledb"
import { StatusCodes } from "http-status-codes"

import createPool from "../database/database.config.js"
const pool = await createPool()

export default class ServiceRol{
  async obtenerRoles () {
    const roles = await (await pool.getConnection()).execute('SELECT * FROM ROL', [], {outFormat: OracleDB.OUT_FORMAT_OBJECT})
    
    if (roles.rows.length === 0) {
      return {
        codigoEstado: StatusCodes.NOT_FOUND,
        mensaje: `No se ha podido encontrar ningun rol`
      }
    }

    return {
      codigoEstado: StatusCodes.OK,
      mensaje: 'Roles obtenidos correctamente',
      entidad: roles.rows
    }
  }
} 