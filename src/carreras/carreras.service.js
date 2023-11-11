import { StatusCodes } from "http-status-codes";
import OracleDB from "oracledb";

import createPool from "../database/database.config.js";

const pool = await createPool();

export default class ServiceCarreras {
  async obtenerCarreras() {
    const carreras = await (await pool.getConnection()).execute(
    `SELECT c.ID, c.NOM_CARRERA, g.TIPO, f.NOM_FACULTAD, te.NOMBRE, d.DESCRIPCION, c.NOTA_APR FROM CARRERA c 
    INNER JOIN TIPO_EXAM te 
    ON te.ID = c.EX_EXTRA
    INNER JOIN FACULTAD f 
    ON f.ID = c.FACULTAD_ID 
    INNER JOIN GRADO g 
    ON g.ID = c.GRADO_ID 
    INNER JOIN DURACION d 
    ON d.ID = c.DURACION_ID`, 
    [], 
    {outFormat: OracleDB.OUT_FORMAT_OBJECT})
  
    if (carreras.rows.length === 0) {
      return {
        codigoEstado: StatusCodes.NOT_FOUND,
        mensaje: `No se ha podido encontrar ninguna carrera`
      }
    }
  
    return {
      codigoEstado: StatusCodes.OK,
      mensaje: 'Carreras obtenidas correctamente',
      entidad: carreras.rows
    }
  }
}
