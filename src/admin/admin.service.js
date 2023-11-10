import { StatusCodes } from "http-status-codes";
import path from "node:path";

import createPool from "../database/database.config.js";
import { fnSPCUD, fnSPGet } from "../utils/databaseFunctions.js";
import { leerCSV } from "../utils/leerCSV.js";

const pool = await createPool();

export class AdminService {
  async ingresarNotasAspirantes(nombreArchivo) {
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

  async registrarEstudiantes(nombreArchivo) {
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
  
          const { DESCRIPCION, PERSONA_DNI, CAR_DISPONIBLE_ID } = item;
          const estudianteActual = await fnSPCUD(pool, "INGRESAR_ESTUDIANTE", [
            DESCRIPCION,
            PERSONA_DNI,
            +CAR_DISPONIBLE_ID
          ]);

          if (estudianteActual === null) {
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
      mensaje: `Estudiantes registrados correctamente`,
    };
  }
}
