import { StatusCodes } from "http-status-codes";
import bcrypt from 'bcrypt'
import OracleDB from "oracledb";

import { schemaDocentes, schemaNotasEstudiantes } from "./docentes.schema.js"
import createPool from '../database/database.config.js'
import { fnSPCUD, fnSPGet } from '../utils/databaseFunctions.js';
import transporter from '../utils/transporter.js';
import generarToken2 from '../utils/generarToken2.js';


const pool = await createPool()

export class DocentesService {
  async crear (docente) {
    const {error} = schemaDocentes.validate(docente)
    console.log(error)


    if (error !== undefined) {
      return {
        codigoEstado: StatusCodes.BAD_REQUEST,
        mensaje: `Ocurrio un error al crear un nuevo docente: ${error.details[0].message}`,
        token: null
      };
    }

    const salt = await bcrypt.genSalt(10);
    const contrasenia = await bcrypt.hash(docente.contrasenia, salt) 
    
    const {dni, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, direccion, correo_electronico, foto_empleado, rol_id, carrera, telefono} = docente
    const inVARS = [dni, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, direccion, correo_electronico, contrasenia, foto_empleado, rol_id, carrera, telefono]
    
    const docenteActual = await fnSPCUD(pool, "CREAR_DOCENTE", inVARS);

    if (docenteActual.mensaje === null) {
      return {
        codigoEstado: StatusCodes.BAD_REQUEST,
        mensaje: 'No se ha podido crear al docente'
      }
    }

    return {
      codigoEstado: StatusCodes.OK,
      mensaje: docenteActual.mensaje
    };
  }

  async obtenerDocentes(nEmpleado){
    const estructureSP = ["ID", "NOMBRE", "CENTRO"]
    const docentes = await fnSPGet(pool, "OBTENER_DOCENTES_JEFE", estructureSP, [nEmpleado])

    if (docentes === null) {
      return {
        codigoEstado: StatusCodes.NOT_FOUND,
        mensaje: `No se ha podido encontrar ningun docente en la base de datos`
      }
    }
  
    return {
      codigoEstado: StatusCodes.OK,
      mensaje: 'Docentes obtenidos correctamente',
      entidad: docentes
    }
  }

  async obtenerDocentePorNEmpleado(nEmpleado){
    const docente = await (await pool.getConnection()).execute(`
      SELECT distinct d.N_EMPLEADO, d.PERSONA_DNI, p.PRIMERNOMBRE, p.SEGUNDONOMBRE, p.PRIMERAPELLIDO, p.SEGUNDOAPELLIDO, p.CORREOELECTRONICO, p.DIRECCION, p.TELEFONO, d.FOTOEMPLEADO, r.ROL, c.NOM_CARRERA, c2.NOMBRE AS CENTRO, c2.ACRONIMO FROM DOCENTE d 
      INNER JOIN ROL r 
      ON r.ID = d.ROL_ID 
      INNER JOIN CARRERA c 
      ON d.CAR_DISPONIBLE_ID = c.ID 
      INNER JOIN PERSONA p 
      ON p.DNI = d.PERSONA_DNI 
      INNER JOIN CAR_DISPONIBLE cd
      ON cd.CARRERA_ID = c.ID
      INNER JOIN CENTRO c2
      ON c2.ID = cd.CARRERA_ID
      WHERE d.N_EMPLEADO = :nEmpleado
    `, 
    [nEmpleado], 
    {outFormat: OracleDB.OUT_FORMAT_OBJECT})

    if (docente.rows.length === 0) {
      return {
        codigoEstado: StatusCodes.NOT_FOUND,
        mensaje: `No se ha podido encontrar ningun docente en la base de datos`
      }
    } 
  
    return {
      codigoEstado: StatusCodes.OK,
      mensaje: 'Docente obtenido correctamente',
      entidad: docente.rows
    }
  }

  async obtenerSeccionesPorDocente(usuario) {
    const estructureSP = ['ID_SECCION', 'NOMBRE_SECCION', 'NOMBRE_ASIGNATURA']
    console.log(usuario)
    const secciones = await fnSPGet(pool, "SECCION_DOCENTE", estructureSP, [usuario])

    if (secciones === null) {
      return {
        codigoEstado: StatusCodes.BAD_REQUEST,
        mensaje: 'No se ha podido obtener ninguna seccion',
        entidad: null
      }
    }

    return {
      codigoEstado: StatusCodes.OK,
      mensaje: 'Secciones por docente obtenidas con éxito!.',
      entidad: secciones
    }
  }

  async obtenerInfoInicioJefe(usuario){
    const estructureSP = ["NOMBRE", "FACULTAD", "CENTRO", "CARRERA"]
    const infoInicio = await fnSPGet(pool, "INICIO_JEFEDEPARTAMENTO", estructureSP, [usuario])

    if (infoInicio === null) {
      return {
        codigoEstado: StatusCodes.BAD_REQUEST,
        mensaje: 'No se ha podido obtener ninguna informacion',
        entidad: null
      }
    }

    return {
      codigoEstado: StatusCodes.OK,
      mensaje: 'Info obtenida con éxito!.',
      entidad: infoInicio
    }
  }

  async obtenerEstudiantesPorSeccion(seccion) {
    const estructureSP = ['N_CUENTA','NOMBRE_COMPLETO','CORREO','NOTA']

    const secciones = await fnSPGet(pool, "ESTUDIANTES_SECCION", estructureSP, [seccion])

    if (secciones === null) {
      return {
        codigoEstado: StatusCodes.BAD_REQUEST,
        mensaje: 'No se ha podido obtener ningun estudiante',
        entidad: null
      }
    }

    return {
      codigoEstado: StatusCodes.OK,
      mensaje: 'Estudiantes Obtenidos con exito',
      entidad: secciones
    }
  }

  async ingresarNotaPorDocente(infoNotas) {
   
    const {error} = schemaNotasEstudiantes.validate(infoNotas)

    if (error !== undefined) {
      return {
        codigoEstado: StatusCodes.BAD_REQUEST,
        mensaje: `Ocurrio un error al crear un nuevo docente: ${error.details[0].message}`,
        token: null
      };
    }

    const{correo_electronico,nota,cuenta,seccion}=infoNotas;
    const inVARS =[nota,cuenta,seccion];
    const NOTAS = await fnSPCUD(pool, "INGRESAR_NOTA", inVARS);

    if (NOTAS.mensaje === null) {
      return {
        codigoEstado: StatusCodes.BAD_REQUEST,
        mensaje: 'No se ha podido ingresar las notas'
      }
    }else{
    let  mailOptions = {
        from: 'unahproyecto6@gmail.com',
        to: correo_electronico,
        subject: 'NOTIFICACION',
        text: '\n\n UN DOCENTE YA HA INGRESADO SU NOTA AL SISTEMA'
      };
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
      mensaje: NOTAS.mensaje
    }
  }


  async obtenerSeccionesPorDocente2(DOCENTE){

    const estructureSP = ["ID", "NOMBRE"]
    const seccion= await fnSPGet(pool, "OBTENER_SECCIONES_DOCENTE", estructureSP, [DOCENTE]);

    if (seccion === null) {
      return {
        codigoEstado: StatusCodes.NOT_FOUND,
        mensaje: `No se ha podido obtener las secciones`
      }
    }
  
    return {
      codigoEstado: StatusCodes.OK,
      mensaje: 'Secciones Obtenidas Correctamente',
      entidad: seccion
    }
  }

  async obtenerEvaluacionesaDocentes(seccion) {
    const estructureSP = ['AREA_PERSONAL','AREA_PROFESIONAL','AREA_ACADEMICA','OBSERVACIONES']

    const secciones = await fnSPGet(pool, "OBTENEREVALUACIONDOCENTE", estructureSP, [seccion])

    if (secciones === null) {
      return {
        codigoEstado: StatusCodes.BAD_REQUEST,
        mensaje: 'No se obtuvo ninguna evaluacion',
        entidad: null
      }
    }

    return {
      codigoEstado: StatusCodes.OK,
      mensaje: 'Evaluaciones Obtenidas con Exito',
      entidad: secciones
    }
  }


  async obtenerEstadisticas(usuario) {
    const estructureSP = ['NEMPLEADO','NOMBRE','AREA_PERSONAL','AREA_PROFESIONAL','AREA_ACADEMICA']

    const secciones = await fnSPGet(pool, "OBTENERESTADISTICAS", estructureSP, [usuario])

    if (secciones === null) {
      return {
        codigoEstado: StatusCodes.BAD_REQUEST,
        mensaje: 'No se obtuvo ninguna evaluacion',
        entidad: null
      }
    }

    return {
      codigoEstado: StatusCodes.OK,
      mensaje: 'Evaluaciones Obtenidas con Exito',
      entidad: secciones
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
    text: '\n\n DOCENTE: ' + NOMBRE + ' CON NUMERO DE EMPLEADO: ' + NEMPLEADO
    + '\n\n INGRESE EN EL SIGUIENTE LINK PARA RESTABLECER CONTRASEÑA: http://192.168.191.114:3000/api/v1/docentes/restablecer-clave/?token='+token
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


async obtenerPerfilDocente(seccion) {
  const estructureSP = ['NOMBRE_DOCENTE','CORREOELECTRONICO','FOTO_EMPLEADO','DEPARTAMENTO','SECCION','ASIGNATURA','COD_ASIG']

  const secciones = await fnSPGet(pool, "PERFIL_DOCENTE", estructureSP, [seccion])

  if (secciones === null) {
    return {
      codigoEstado: StatusCodes.BAD_REQUEST,
      mensaje: 'No se obtuvo ninguna evaluacion',
      entidad: null
    }
  }

  return {
    codigoEstado: StatusCodes.OK,
    mensaje: 'Evaluaciones Obtenidas con Exito',
    entidad: secciones
  }
}



}
