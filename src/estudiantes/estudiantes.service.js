import { StatusCodes } from "http-status-codes";
import {schemaEvaluacionDocente, schemaCambioCarrera,schemaCambioCentro, schemaCancelacion,schemaRepo} from "./estudiantes.schema.js"
import createPool from '../database/database.config.js'
import { fnSPCUD, fnSPGet } from '../utils/databaseFunctions.js';
import transporter from '../utils/transporter.js';
import generarToken2 from '../utils/generarToken2.js';
import {crearPDF2} from '../utils/escribir-pdf.js';
import path from 'node:path';
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
    const estructureSP2 = ["ID","COD_ASIGNATURA","ASIGNATURA","SECCION","UV","HORA_INICIO","HORA_FIN","DOCENTE","LUNES","MARTES","MIERCOLES","JUEVES","VIERNES","SABADO","DOMINGO","VIDEO"]
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
    const estructureSP2 = ["NOMBRE_ALUMNO", "N_CUENTA", "CARRERA","CENTRO","CORREO"];
    const estructureSP3 = ["INDICE"];

    const estudiante= await fnSPGet(pool, "HISTORIAL_ACADEMICO", estructureSP, [usuario]);
    const estudiante2= await fnSPGet(pool, "PERFIL_ESTUDIANTE", estructureSP2, [usuario]);
    const estudiante3= await fnSPGet(pool, "OBTENER_INDICE", estructureSP3, [usuario]);
    
   

    estudiante2[0].INDICE=estudiante3[0].INDICE
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



  async restablecerClave(DNI) {
    const estructureSP = ['NEMPLEADO','NOMBRE','CORREO']
  
    const persona = await fnSPGet(pool, "OBTENERCORREO", estructureSP, [DNI]);
    const {NEMPLEADO,NOMBRE,CORREO}=persona[0];
    const token = generarToken2({usuario: NEMPLEADO})
    if (persona === null) {
      return {
        codigoEstado: StatusCodes.BAD_REQUEST,
        mensaje: 'No existe esa persona en la base',
        entidad: null
      }
    }
  
    let  mailOptions = {
      from: 'unahproyecto6@gmail.com',
      to: CORREO,
      subject: 'RESTABLECER CONTRASEÑA DE ACCESO AL SISTEMA',
      text: '\n\n ESTUDIANTE: ' + NOMBRE + ' CON NUMERO DE CUENTA: ' + NEMPLEADO
      + '\n\n INGRESE EN EL SIGUIENTE LINK PARA RESTABLECER CONTRASEÑA: http://192.168.191.114:3000/api/restablecer-clave/?token='+token
    };
    await transporter.sendMail(mailOptions, function(err, data) {
    if (err) {
      console.log("Error " + err);
    } else {
      console.log("Email sent successfully");
    }
    });
   
  
    return {
      codigoEstado: StatusCodes.OK,
      mensaje: 'Encontrado con exito',
      entidad: persona
    }
  }
  
  
  async restablecerCuenta(usuario,contrasenia) {
    
    const salt = await bcrypt.genSalt(10);
    const contra = await bcrypt.hash(contrasenia, salt) 
  
    const cuenta = await fnSPCUD(pool, "ENVIAR_CONTRA", [usuario,contra])
  
    if (cuenta === null) {
      return {
        codigoEstado: StatusCodes.BAD_REQUEST,
        mensaje: 'No se obtuvo ninguna evaluacion',
      }
    }
  
  
    return {
      codigoEstado: StatusCodes.OK,
      mensaje: cuenta.mensaje,
    }
  }
  

  async solicitudCambioCarrea(usuario,infoUsuario){

    const {error} = schemaCambioCarrera.validate(infoUsuario)
    
    if (error !== undefined) {
      return {
        codigoEstado: StatusCodes.BAD_REQUEST,
        mensaje: `Error al crear la solicitud: ${error.details[0].message}`,
        token: null
      };
    }
   
    const {justificacion, id_carrera} = infoUsuario;
    const inVARS=[usuario,id_carrera,justificacion]
 
    const solicitud= await fnSPCUD(pool, "SP_CAMBIO_CAR" ,inVARS);
   
    if (solicitud.mensaje === null) {
      return {
        codigoEstado: StatusCodes.NOT_FOUND,
        mensaje: `No se ha podido realizar la solicitud`
      }
    }
  
    return {
      codigoEstado: StatusCodes.OK,
      mensaje: solicitud.mensaje,
    }
  }


  async solicitudCambioCentro(usuario,infoCambioCentro){

    const {error} = schemaCambioCentro.validate(infoCambioCentro)

    if (error !== undefined) {
      return {
        codigoEstado: StatusCodes.BAD_REQUEST,
        mensaje: `Error al crear la solicitud: ${error.details[0].message}`,
        token: null
      };
    }
    const {justificacion, id_centro} = infoCambioCentro;
    const inVARS=[usuario,justificacion,id_centro]
   
    const solicitud= await fnSPCUD(pool, "SP_CAMBIO_CENTRO" ,inVARS);

    if (solicitud.mensaje === null) {
      return {
        codigoEstado: StatusCodes.NOT_FOUND,
        mensaje: `No se ha podido realizar la solicitud`
      }
    }
  
    return {
      codigoEstado: StatusCodes.OK,
      mensaje: solicitud.mensaje,
    }
  }


  async solicitudCancelacion({usuario, infoCancelacion, foto_cancelacion}){

    const {error} = schemaCancelacion.validate(infoCancelacion)
    if (error !== undefined) {
      return {
        codigoEstado: StatusCodes.BAD_REQUEST,
        mensaje: `Error al crear la solicitud: ${error.details[0].message}`,
        token: null
      };
    }
    const {justificacion,id_seccion} = infoCancelacion;
    const inVARS=[usuario, foto_cancelacion, justificacion]

    const solicitud= await fnSPCUD(pool, "SP_CANCELACION_EX", inVARS);

    const idDeSolicitud = solicitud.mensaje;
    const inVARS2=[id_seccion, idDeSolicitud]

    const secciones= await fnSPCUD(pool, "SP_CANCELAR_SEC_EXC", inVARS2);
    
    if (solicitud.mensaje === null) {
      return {
        codigoEstado: StatusCodes.NOT_FOUND,
        mensaje: `No se ha podido realizar la solicitud`
      }
    }
  
    return {
      codigoEstado: StatusCodes.OK,
      mensaje: 'Solicitud agregada exitosamente',
    }
  }

  async solicitudRepo(usuario,infoRepo){
    const {error} = schemaRepo.validate(infoRepo)
    if (error !== undefined) {
      return {
        codigoEstado: StatusCodes.BAD_REQUEST,
        mensaje: `Error al crear la solicitud: ${error.details[0].message}`,
        token: null
      };
    }
    const {justificacion} = infoRepo;
    const inVARS=[usuario,justificacion]
 
    const solicitud= await fnSPCUD(pool, "SP_REPO" ,inVARS);
    
    if (solicitud.mensaje === null) {
      return {
        codigoEstado: StatusCodes.NOT_FOUND,
        mensaje: `No se ha podido realizar la solicitud`
      }
    }
  
    return {
      codigoEstado: StatusCodes.OK,
      mensaje: solicitud.mensaje,
    }
  }

 
  async obtenerSolicitudes(usuario){

    const estructureSP = ["NOMBRE", "NUMERO_CUENTA","FECHA_SOLICITUD","TIPO","ESTADO"];
  
    const repo= await fnSPGet(pool, "OBTENER_S_REPO", estructureSP, [usuario]);


    if (usuario === null) {
      return {
        codigoEstado: StatusCodes.NOT_FOUND,
        mensaje: `No se han podido obtener las solicitudes `
      }
    }
  
    return {
      codigoEstado: StatusCodes.OK,
      mensaje: 'Se obtuvieron las solicitudes ',
      entidad: repo
    }
  }


  async obtenerPerfil(usuario){

    const estructureSP = ["INDICE"];
    const estudiante= await fnSPGet(pool, "OBTENER_INDICE", estructureSP, [usuario]);
    const estructureSP2 = ["NOMBRE_ALUMNO", "N_CUENTA", "CARRERA","CENTRO","CORRREO","DESCRIPCION"];
    const estudiante2= await fnSPGet(pool, "PERFIL_ESTUDIANTE", estructureSP2, [usuario]);
    estudiante2[0].INDICE=estudiante[0].INDICE    
    const estructureSP3 = ["URL"];
    const estudiante3= await fnSPGet(pool, "OBTENER_FOTOS", estructureSP3, [usuario]);

    if (usuario === null) {
      return {
        codigoEstado: StatusCodes.NOT_FOUND,
        mensaje: `No se han podido obtener los estudiantes matriculados`
      }
    }
  
    return {
      codigoEstado: StatusCodes.OK,
      mensaje: 'Estudiantes Obtenidos Correctamente',
      entidad: estudiante2,
      entidad2: estudiante3
    }
  }

  async subirFotoPerfil({usuario, foto_perfil}){

    const inVARS = [usuario, foto_perfil]
    const fotoPerfil = await fnSPCUD(pool, "AGREGAR_FOTO_PERFIL", inVARS);
    console.log(inVARS)
    if (fotoPerfil.mensaje === null) {
      return {
        codigoEstado: StatusCodes.NOT_FOUND,
        mensaje: `No se ha podido actualizar la foto de perfil`
      }
    }
  
    return {
      codigoEstado: StatusCodes.OK,
      mensaje: fotoPerfil.mensaje,
      
    }
  }



  async agregarDescripcion(usuario,descripcion){

    
    const estudiante= await fnSPCUD(pool, "DESCRIPCION_ESTUDIANTE", [usuario,descripcion]);

    if (usuario === null) {
      return {
        codigoEstado: StatusCodes.NOT_FOUND,
        mensaje: `No se han podido obtener los estudiantes matriculados`
      }
    }
  
    return {
      codigoEstado: StatusCodes.OK,
      mensaje: estudiante.mensaje,
    }
  }


  async descargarHistorial(usuario) {
    try {
     
    const estructureSP = ["INDICE"];
    const estudiante= await fnSPGet(pool, "OBTENER_INDICE", estructureSP, [usuario]);
    const estructureSP2 = ["NOMBRE_ALUMNO", "N_CUENTA", "CARRERA","CENTRO"];
    const estudiante2= await fnSPGet(pool, "PERFIL_ESTUDIANTE", estructureSP2, [usuario]);
    const estructureSP3 = ["NOMBRE_ALUMNO", "N_CUENTA", "NOMBRE_ASIGNATURA","CALIFICACION","ASIGNATURA_COD","UV","PERIODO","AÑO"];
    const historial= await fnSPGet(pool, "HISTORIAL_ACADEMICO", estructureSP3, [usuario]);
    estudiante2[0].INDICE=estudiante[0].INDICE  


      const rutaArchivo = path.join(
        process.cwd(),
        "src",
        "public",
        "pdf",
        "Certificado.pdf"
      );
        console.log(rutaArchivo)
        console.log('xd----------------------------------------------')
      const escribirArchivo = async () => {
        try {
          await crearPDF2(rutaArchivo,estudiante2,historial);
          console.log('Done');
        } catch (err) {
          console.log(err);
        }
      };
      console.log('xdd----------------------------------------------')
      await escribirArchivo(); 
      console.log('xpp----------------------------------------------')
      return {
        codigoEstado: StatusCodes.OK,
        entidad: rutaArchivo
      };
    } catch (err) {
      console.log(err);
    }
  } 
} 