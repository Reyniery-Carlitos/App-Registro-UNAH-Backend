import { StatusCodes } from "http-status-codes";
import {schemaEvaluacionDocente} from "./estudiantes.schema.js"
import createPool from '../database/database.config.js'
import { fnSPCUD, fnSPGet } from '../utils/databaseFunctions.js';

const pool = await createPool()

export class EstudianteServices {

   async obtenerSeccionesPorEstudiante(usuario){

    const estructureSP = ["ID_SECCION", "SECCION_NOMBRE", "NOMBRE_ASIGNATURA","NOMBRE_DOCENTE","ESTADO_EVALUACION"]
    const seccion= await fnSPGet(pool, "OBTENER_SECCIONES_ESTUDIANTE", estructureSP, [usuario]);

    if (seccion === null) {
      return {
        codigoEstado: StatusCodes.NOT_FOUND,
        mensaje: `No se ha podido encontrar las secciones del estudiante`
      }
    }
  
    return {
      codigoEstado: StatusCodes.OK,
      mensaje: 'Secciones obtenidas correctamente',
      entidad: seccion
    }
  }

  async evaluarDocentePorEstudiante(usuario,infoEvaluacion){

    const {error} = schemaEvaluacionDocente.validate(infoEvaluacion)

    if (error !== undefined) {
      return {
        codigoEstado: StatusCodes.BAD_REQUEST,
        mensaje: `Error al evaluar el docente: ${error.details[0].message}`,
        token: null
      };
    }

    const{id,  observaciones,  area_personal,  area_profesional,  area_academico} = infoEvaluacion;
    const inVARS=[id,usuario,observaciones,area_personal,  area_profesional,  area_academico]
 
    const evaluacion= await fnSPCUD(pool, "EVALUACION_DOCENTE" ,inVARS);

    if (evaluacion.mensaje === null) {
      return {
        codigoEstado: StatusCodes.NOT_FOUND,
        mensaje: `No se ha podido encontrar las secciones del estudiante`
      }
    }
  
    return {
      codigoEstado: StatusCodes.OK,
      mensaje: evaluacion.mensaje,
    }
  }


  async obtenerNotasPorEstudiante(usuario){

    const estructureSP = ["ID_SECCION", "SECCION_NOMBRE", "NOMBRE_ASIGNATURA","CALIFICACION"]
    const seccion= await fnSPGet(pool, "OBTENER_NOTAS_ESTUDIANTE", estructureSP, [usuario]);

    if (seccion === null) {
      return {
        codigoEstado: StatusCodes.NOT_FOUND,
        mensaje: `No se ha podido encontrar las secciones del estudiante`
      }
    }
  
    return {
      codigoEstado: StatusCodes.OK,
      mensaje: 'Secciones obtenidas correctamente',
      entidad: seccion
    }
  }


}