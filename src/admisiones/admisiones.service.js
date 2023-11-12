import { StatusCodes } from 'http-status-codes';
import path from 'node:path'

import { fnSPCUD } from '../utils/databaseFunctions.js';
import { leerCSV } from '../utils/leerCSV.js';
import createPool from '../database/database.config.js';
import crearCsv from '../utils/escribir-csv.js';

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
            +CAR_DISPONIBLE_ID,
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

  async obtenerCsvAspirantesAprobados() {
    const rutaArchivo = path.join(
      process.cwd(),
      "src",
      "public",
      "csv",
      "aspirantes-admitidos.csv"
    );
    
    const csvWriter = crearCsv(rutaArchivo)

    const record = [
      {dni: '0801200198765', nombre_completo: 'Carlos Reyniery Rubio', carrera: 'Ingenieria en sistemas', direccion: 'Col. El Sauce', correo: 'carlos@gmail.com', centro: 'Ciudad universitaria, CU'}
    ]

    csvWriter.writeRecords(record)
    .then(() => {
      console.log('Done')
    })
    .catch((err) => {
      console.log(err)
    })

    return {
      codigoEstado: StatusCodes.OK,
      entidad: rutaArchivo
    }
  }
}