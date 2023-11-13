import { StatusCodes } from "http-status-codes";


import { schemaAspirantes } from "./aspirantes.schema.js"
import createPool  from "../database/database.config.js";
import { fnSPCUD, fnSPGet } from '../utils/databaseFunctions.js'

const pool = await createPool()

export class AspirantesService{
  async crear(aspirante) {
    const {error} = schemaAspirantes.validate(aspirante)

    if (error) {
      return {
        codigoEstado: StatusCodes.BAD_REQUEST,
        mensaje: `Ocurrio un error al crear un nuevo aspirante: ${error.details[0].message}`
      };
    }

    const {telefono, dni, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, direccion, correo_electronico, foto_certificado, centro_id, carrera_principal_id, carrera_secundaria_id} = aspirante 
    
    // const estructureSP = ['DNI', 'Centro', 'Nombre', 'Direccion', 'Correo', 'Telefono', 'PRIMERA_CARRERA', 'NOTA_APROBATORIA', 'SEGUNDA_CARRERA', 'NOTA_APROBATORIA2', 'PAA', 'EXAMEN_EXTRA1', 'EXAMEN_EXTRA2']

    // let inVARS = [dni]
    // const existeUsuario = await fnSPGet(pool, "OBTENER_DATOS_ASPIRANTE", estructureSP, inVARS)

    // if (existeUsuario) {
    //   return {
    //     codigoEstado: StatusCodes.BAD_REQUEST,
    //     mensaje: `Ya existe un aspirante con el dni: ${dni}`
    //   }  
    // }
    
    const inVARS = [dni, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, direccion, correo_electronico, foto_certificado, centro_id, carrera_principal_id, carrera_secundaria_id, telefono]
    
    const aspiranteActual = await fnSPCUD(pool, "CREAR_ASPIRANTE", inVARS);
    console.log({aspiranteActual})
    
    if (!aspiranteActual) {
      return {
        codigoEstado: StatusCodes.BAD_REQUEST,
        mensaje: 'No se ha podido crear el aspirante'
      }  
    }

    return {
      codigoEstado: StatusCodes.OK,
      mensaje: 'Aspirante creado con éxito!.'
    };
  }

  async obtenerDatosPorId(dni) {
    const estructureSP = ['DNI', 'Centro', 'Nombre', 'Direccion', 'Correo', 'Telefono', 'PRIMERA_CARRERA', 'NOTA_APROBATORIA', 'SEGUNDA_CARRERA', 'NOTA_APROBATORIA2', 'PAA', 'EXAMEN_EXTRA1', 'EXAMEN_EXTRA2']
    const inVARS = [dni]

    const usuarioActual = await fnSPGet(pool, "OBTENER_DATOS_ASPIRANTE", estructureSP, inVARS)

    console.log(usuarioActual)
    if (usuarioActual === null || !usuarioActual) {
      return {
        codigoEstado: StatusCodes.NOT_FOUND,
        mensaje: `No se ha podido encontrar el usuario con id: ${dni}`
      }
    }

    return {
      codigoEstado: StatusCodes.OK,
      mensaje: `Usuario con id ${dni} encontrado`,
      entidad: usuarioActual
    }
  }
}