import { fnSPGet } from '../utils/databaseFunctions.js'
import { StatusCodes } from 'http-status-codes'

import createPool from '../database/database.config.js'
import OracleDB from 'oracledb'

const pool = await createPool()

export default class CentrosService{
  async obtenerCentros() {
    // const estructureSP = ['ID', 'NOMBRE']
    
    // const inVARS = []
    // const centros = await fnSPGet(pool, "OBTENER_CENTROS", estructureSP, inVARS)
    const centros = await (await pool.getConnection()).execute('SELECT * FROM CENTRO', [], {outFormat: OracleDB.OUT_FORMAT_OBJECT})
    
    if (centros.rows.length === 0) {
      return {
        codigoEstado: StatusCodes.NOT_FOUND,
        mensaje: `No se ha podido encontrar ningun centro`
      }
    }

    return {
      codigoEstado: StatusCodes.OK,
      mensaje: 'Centros obtenidos correctamente',
      entidad: centros.rows
    }
  }

  async obtenerCentrosPorIdCarrera(id) {
    const centros = await (await pool.getConnection()).execute(
      ` SELECT c2.ID, c2.NOMBRE, c2.ACRONIMO FROM CARRERA c 
        INNER JOIN CAR_DISPONIBLE cd 
        ON cd.CARRERA_ID = c.ID 
        INNER JOIN CENTRO c2 
        ON cd.CENTRO_ID = c2.ID
        WHERE c.ID = :id
      `, 
      [id], 
      {outFormat: OracleDB.OUT_FORMAT_OBJECT}
    )
    
    if (centros.rows.length === 0) {
      return {
        codigoEstado: StatusCodes.NOT_FOUND,
        mensaje: `No se ha podido encontrar ningun centro`
      }
    }

    return {
      codigoEstado: StatusCodes.OK,
      mensaje: 'Centros obtenidos correctamente',
      entidad: centros.rows
    }
  }
}