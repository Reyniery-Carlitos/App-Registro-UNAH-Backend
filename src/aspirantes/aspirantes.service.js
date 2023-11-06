import { StatusCodes } from "http-status-codes";


import { schemaAspirantes } from "./aspirantes.schema.js"
import createPool  from "../database/database.config.js";
import { fnSPCUD } from '../utils/databaseFunctions.js'

const pool = await createPool()

export class AspirantesService{
  async crear(aspirante) {
    const {error} = schemaAspirantes.validate(aspirante)
    console.log(aspirante)

    if (error) {
      return {
        codigoEstado: StatusCodes.BAD_REQUEST,
        mensaje: `Ocurrio un error al crear un nuevo aspirante: ${error}`
      };
    }
    console.log(aspirante)

    const {telefono, dni, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, direccion, correo_electronico, foto_certificado, centro_id, carrera_principal_id, carrera_secundaria_id} = aspirante 
    
    const inVARS = [dni, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, direccion, correo_electronico, foto_certificado, centro_id, carrera_principal_id, carrera_secundaria_id, telefono]
    
    const aspiranteActual = await fnSPCUD(pool, "CREAR_ASPIRANTE", inVARS);
    console.log(aspiranteActual.mensaje)
    
    if (aspiranteActual.mensaje === null) {
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
}