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


  async obtenerEstudiantesMatriculados(){

    const estructureSP = ["CUENTA", "NOMBRE", "CARRERA"]
    const seccion= await fnSPGet(pool, "OBTENER_ESTUDIANTES_MATRICULADOS", estructureSP, []);

    if (seccion === null) {
      return {
        codigoEstado: StatusCodes.NOT_FOUND,
        mensaje: `No se han podido obtener los estudiantes matriculados`
      }
    }
  
    return {
      codigoEstado: StatusCodes.OK,
      mensaje: 'Estudiantes Obtenidos Correctamente',
      entidad: seccion
    }
  }


  async obtenerPerfilMatricula(usuario,seccion){

    const estructureSP1 = ["CUENTA", "NOMBRE", "PERIODO","AÑO","UV"]
    const perfil= await fnSPGet(pool, "PERFIL_MATRICULA_ESTUDIANTE", estructureSP1, [usuario]);
    const estructureSP2 = ["ID","COD_ASIGNATURA","ASIGNATURA","SECCION","UV","HORA_INICIO","HORA_FIN","DOCENTE","LUNES","MARTES","MIERCOLES","JUEVES","VIERNES","SABADO","DOMINGO"]
    const clases= await fnSPGet(pool, "OBTENER_CLASES_MATRICULADAS", estructureSP2, [usuario]);
    const estructureSP3 = ["INDICE"]
    const indice = await fnSPGet(pool, "OBTENER_INDICE", estructureSP3, [usuario]);
    
    if (seccion === null) {
      return {
        codigoEstado: StatusCodes.NOT_FOUND,
        mensaje: `No se ha podido encontrar las secciones del estudiante`
      }
    }
  
    return {
      codigoEstado: StatusCodes.OK,
      mensaje: 'Secciones obtenidas correctamente',
      entidad: perfil ,
      entidad2: clases
    }
  }



  async obtenerSeccionesParaMatricular(usuario){

    const estructureSP = ["SECCION_ID", "NOMBRE_SECCION", "NOMBRE_ASIGNATURA","NOMBRE_REQUISITO","COD_ASIGNATURA","COD_REQUISITO","HORA_INICIO","HORA_FINALl","DOCENTE","LUNES","MARTES","MIERCOLES","JUEVES","VIERNES","SABADO","DOMINGO"]
    const seccion= await fnSPGet(pool, "OBTENER_CLASES_A_MATRICULAR", estructureSP, [usuario]);
    const estructureSP2 = ["COD_ASIGNATURA"]
    const seccion2= await fnSPGet(pool, "OBTENER_CLASES_CURSADAS", estructureSP2, [usuario]);
    console.log(seccion)
    console.log(seccion2)

    const codigosAExcluir = seccion2.map(asignatura => asignatura.COD_ASIGNATURA);

// Filtra el primer JSON excluyendo las asignaturas con códigos presentes en el segundo JSON
  const primerJSONFiltrado = seccion.filter(asignatura => !codigosAExcluir.includes(asignatura.COD_ASIGNATURA));

  console.log(primerJSONFiltrado);
    if (seccion === null) {
      return {
        codigoEstado: StatusCodes.NOT_FOUND,
        mensaje: `No se han podido obtener los estudiantes matriculados`
      }
    }
  
    return {
      codigoEstado: StatusCodes.OK,
      mensaje: 'Estudiantes Obtenidos Correctamente',
      entidad: primerJSONFiltrado
    }
  }

  async cancelarSeccionEstudiante(usuario,seccionID){

    const seccion= await fnSPCUD(pool, "CANCELAR_ASIGNATURA_ESTUDIANTE", [usuario,seccionID]);

    if (seccion === null) {
      return {
        codigoEstado: StatusCodes.NOT_FOUND,
        mensaje: `ERROR AL CANCELAR ASIGNATURA`
      }
    }
  
    return {
      codigoEstado: StatusCodes.OK,
      mensaje: seccion.mensaje
    }
  }

  async adicionarSeccionEstudiante(usuario,seccionID){

    const seccion= await fnSPCUD(pool, "ADICIONAR_ASIGNATURA", [usuario,seccionID]);

    if (seccion === null) {
      return {
        codigoEstado: StatusCodes.NOT_FOUND,
        mensaje: `ERROR AL ADICIONAR ASIGNATURA`
      }
    }
  
    return {
      codigoEstado: StatusCodes.OK,
      mensaje: seccion.mensaje
    }
  }



  async obtenerHistorialAcademico(usuario){

    const estructureSP = ["NOMBRE_ALUMNO", "N_CUENTA", "NOMBRE_ASIGNATURA","CALIFICACION"];
    const estructureSP2 = ["NOMBRE_ALUMNO", "N_CUENTA", "CARRERA"];
    const estudiante= await fnSPGet(pool, "HISTORIAL_ACADEMICO", estructureSP, [usuario]);
    const estudiante2= await fnSPGet(pool, "PERFIL_ESTUDIANTE", estructureSP2, [usuario]);

    if (usuario === null) {
      return {
        codigoEstado: StatusCodes.NOT_FOUND,
        mensaje: `No se han podido obtener los estudiantes matriculados`
      }
    }
  
    return {
      codigoEstado: StatusCodes.OK,
      mensaje: 'Estudiantes Obtenidos Correctamente',
      entidad: estudiante,
      entidad2:estudiante2
    }
  }

}