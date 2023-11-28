import { StatusCodes } from 'http-status-codes';
import path from 'node:path'
import bcrypt from 'bcrypt'

import { fnSPCUD, fnSPGet } from '../utils/databaseFunctions.js';
import { leerCSV } from '../utils/leerCSV.js';
import createPool from '../database/database.config.js';
import crearCsv from '../utils/escribir-csv.js';
import transporter from '../utils/transporter.js';
// import { createTransport } from "nodemailer";
import generarContraAleatoria from '../utils/generarContraAleatoria.js';

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

    let codigoError;
   
    await leerCSV(rutaArchivo)
      .then(async (data) => {
        for (let item of data) {
          const { DNI, PUNTUACION, TIPO_EXAMEN } = item;
          
         
          const notaActual = await fnSPCUD(pool, "Ingresar_Nota_Aspirante", [
            DNI,
            +PUNTUACION,
            TIPO_EXAMEN
          ]);
          
          if (notaActual === null) {
            return {
              codigoEstado: StatusCodes.BAD_REQUEST,
              mensaje: `Error en el CSV de datos`,
            };

          }

          console.log(notaActual.mensaje);
         
          if(notaActual.mensaje!=='UNAH22'){
            
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
            const PDNI = notaActual.mensaje.split(' ')[0]
            const Pcorreo = notaActual.mensaje.split(' ')[1]
            const inVARS=[PDNI];
        
            const ResultadosJSON = await fnSPGet(pool,"RESULTADOS_ASPIRANTE",estructureSP,inVARS);
            const resultado = ResultadosJSON[0];

            let mailOptions; 
            if (resultado.EXAMEN_EXTRA2 !=null) {
              mailOptions = {
                from: 'unahproyecto6@gmail.com',
                to: Pcorreo,
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
                to: Pcorreo,
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
        
          }else{
            codigoError=notaActual.mensaje;
          }
        }
      })
      .catch((err) => {
        return {
          codigoEstado: StatusCodes.BAD_REQUEST,
          mensaje: `Error al leer CSV: ${err}`,
        };
      });
    let alerta;
     if (codigoError!== 'UNAH22'){
        alerta='CSV procesado completo y exitosamente';
     }else{
        alerta='CSV procesado parcialmente, revise que los datos del csv sean correctos';
     }

    return {
      codigoEstado: StatusCodes.OK,
      mensaje: alerta,
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
      let codigoError;
    await leerCSV(rutaArchivo)
      .then(async (data) => {
        for (let item of data) {
          const { DNI, PRIORIDAD } = item;
          const contraseniaTemp = generarContraAleatoria(8)

          const salt = await bcrypt.genSalt(10)
          const CONTRASENIA = await bcrypt.hash(contraseniaTemp, salt)

          const estudianteActual = await fnSPCUD(pool, "INGRESAR_ESTUDIANTE", [
            DNI,
            PRIORIDAD,
            CONTRASENIA
          ]);
          

          if (estudianteActual === null) {
            return {
              codigoEstado: StatusCodes.BAD_REQUEST,
              mensaje: `Error en el CSV de datos`,
            };
          }

          if(estudianteActual.mensaje!=='UNAH1'){
            
          const cuenta = estudianteActual.mensaje.split(' ')[0]
          const correo = estudianteActual.mensaje.split(' ')[1]

          let mailOptions = {
            from: 'unahproyecto6@gmail.com',
            to: correo,
            subject: 'Informacion acceso al registro UNAH',
            text: `Cuenta: ${cuenta} - Contrasenia: ${contraseniaTemp}`
          };

          await transporter.sendMail(mailOptions, function(err, data) {
            if (err) {
              console.log("Error " + err);
            } else {
              console.log("Email sent successfully");
            }
          });
          }else{
            codigoError=estudianteActual.mensaje;
          }
          
        }
      })

      .catch((err) => {
        return {
          codigoEstado: StatusCodes.BAD_REQUEST,
          mensaje: `Error al leer CSV ${err}`,
        };
      });
      let alerta
      if(codigoError==='UNAH1'){
        alerta='CSV procesado, pero ya existen estudiantes con el mismo DNI. Ha intentado subir el mismo CSV, por favor descargue uno nuevo.'
      }else{
        alerta='CSV procesado exitosamente';
      }

    return {
      codigoEstado: StatusCodes.OK,
      mensaje: alerta
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

    const estructureSP = ["DNI", "PRIORIDAD"]
    const dataEstudiante = await fnSPGet(pool, "OBTENER_CSV_ESTUDIANTE", estructureSP, [])

    if(dataEstudiante.mensaje === null) {
      return {
        codigoEstado: StatusCodes.BAD_REQUEST,
        mensaje: `Error al descargar el CSV`,
      };
    }

    const csvWriter = crearCsv(rutaArchivo)
    
    await csvWriter.writeRecords(dataEstudiante)
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
