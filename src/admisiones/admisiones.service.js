import { StatusCodes } from 'http-status-codes';
import path from 'node:path'

import { fnSPCUD } from '../utils/databaseFunctions.js';
import { leerCSV } from '../utils/leerCSV.js';
import createPool from '../database/database.config.js';

const pool = await createPool()

export default class ServiceAdmisiones {
  async cargarNotas(nombreArchivo) {
    const rutaArchivo = path.join(
      process.cwd(),
      "src",
      "public",
      "uploads",
      nombreArchivo
    );

    await leerCSV(rutaArchivo)
      .then(async (data) => {
        for (let item of data) {
          const { ID_EXAMEN, PUNTUACION, TIPO_EXAMEN } = item;
          const notaActual = await fnSPCUD(pool, "Ingresar_Nota_Aspirante", [
            +ID_EXAMEN,
            +PUNTUACION,
            +TIPO_EXAMEN,
          ]);

          if (notaActual === null) {
            return {
              codigoEstado: StatusCodes.BAD_REQUEST,
              mensaje: `Error en el CSV de datos`,
            };
          }
        }
      })
      .catch((err) => {
        return {
          codigoEstado: StatusCodes.BAD_REQUEST,
          mensaje: `Error al leer CSV`,
        };
      });

    return {
      codigoEstado: StatusCodes.OK,
      mensaje: `Notas ingresadas correctamente`,
    };
  }
}