import { StatusCodes } from 'http-status-codes';
import path from 'node:path'

import { fnSPCUD, fnSPGet } from '../utils/databaseFunctions.js';
import { leerCSV } from '../utils/leerCSV.js';
import createPool from '../database/database.config.js';
import crearCsv from '../utils/escribir-csv.js';
import transporter from '../utils/transporter.js';
// import { createTransport } from "nodemailer";

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
          console.log(ID_EXAMEN, PUNTUACION, TIPO_EXAMEN)
          const notaActual = await fnSPCUD(pool, "Ingresar_Nota_Aspirante", [
            +ID_EXAMEN,
            +PUNTUACION,
            +TIPO_EXAMEN
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
          mensaje: `Error al leer CSV: ${err}`,
        };
      });
    
    const estructureSP1=["DNI", "CElectronico" ]
    const inVARS1=[]
    const DNIJSON = await fnSPGet(pool,"obtener_Dni_Aspirantes",estructureSP1,inVARS1); 
            
    const estructureSP = [
      "PRIMERA_CARRERA" ,
      "MENS_APROBATORIO",
      "SEGUNDA_CARRERA",
      "MENS_APROBATORIO2",
      "PAA",
      "EXAMEN_EXTRA1",
      "PUNT",
      "EXAMEN_EXTRA2",
      "PUNT2"
    ] 
    
    for (let index = 0; index <DNIJSON.length ; index++) {
      const inVARS=[DNIJSON[index].DNI];
   
      const ResultadosJSON = await fnSPGet(pool,"RESULTADOS_ASPIRANTE",estructureSP,inVARS);
      const resultado = ResultadosJSON[0];

      let mailOptions; 
      if (resultado.EXAMEN_EXTRA2 !=null) {
        mailOptions = {
          from: 'unahproyecto6@gmail.com',
          to: DNIJSON[index].CElectronico,
          subject: 'Resultados de su prueba de admision',
          text: '\n\n RESULTADOS PAA \n\n PRIMERA CARRERA:' + resultado.PRIMERA_CARRERA
          + '\n\n ---- ' + resultado.MENS_APROBATORIO + '----'+
           '\n\n SEGUNDA CARRERA: ' + resultado.SEGUNDA_CARRERA +
           '\n\n ' + '----' + resultado.MENS_APROBATORIO2 + '----' + '\n\n PUNTAJE PAA: ' + resultado.PAA
          + '\n\n ' + resultado.EXAMEN_EXTRA1 + ':  ' + resultado.PUNT
          + '\n\n ' + resultado.EXAMEN_EXTRA2 + ':  ' +resultado.PUNT2
        };
      }else {
        mailOptions = {
          from: 'unahproyecto6@gmail.com',
          to: DNIJSON[index].CElectronico,
          subject: 'Resultados de su prueba de admision',
          text: '\n\n RESULTADOS PAA \n\n PRIMERA CARRERA:' + resultado.PRIMERA_CARRERA
          + '\n\n ---- ' + resultado.MENS_APROBATORIO + '----'+
           '\n\n SEGUNDA CARRERA: ' + resultado.SEGUNDA_CARRERA +
           '\n\n ' + '----' + resultado.MENS_APROBATORIO2 + '----' + '\n\n PUNTAJE PAA: ' + resultado.PAA
          + '\n\n ' + resultado.EXAMEN_EXTRA1 + ':  ' + resultado.PUNT
          
        };
      }

      await transporter.sendMail(mailOptions, function(err, data) {
        if (err) {
          console.log("Error " + err);
        } else {
          console.log("Email sent successfully");
        }
      });
    }

    return {
      codigoEstado: StatusCodes.OK,
      mensaje: `Notas ingresadas correctamente`,
    }
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