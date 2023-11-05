import { StatusCodes } from "http-status-codes";
import bcrypt from 'bcrypt'

import { schemaDocentes } from "./docentes.schema.js"
import createPool from '../database/database.config.js'
import { fnSPCUD } from '../utils/databaseFunctions.js';

const pool = await createPool()

export class DocentesService {
  async crear (docente) {
    const {error} = schemaDocentes.validate(docente)
    console.log(error)


    if (error !== undefined) {
      return {
        codigoEstado: StatusCodes.BAD_REQUEST,
        mensaje: `Ocurrio un error al crear un nuevo docente: ${error}`,
        token: null,
        entidad: null
      };
    }

    const salt = await bcrypt.genSalt(10);
    const contrasenia = await bcrypt.hash(docente.contrasenia, salt) 
    
    const {dni, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, direccion, correo_electronico, foto_empleado, rol_id, carrera} = docente
    const inVARS = [dni, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, direccion, correo_electronico, contrasenia, foto_empleado, rol_id, carrera]
    
    const docenteActual = await fnSPCUD(pool, "CREAR_DOCENTE", inVARS);

    if (docenteActual.mensaje === null) {
      return {
        codigoEstado: StatusCodes.BAD_REQUEST,
        mensaje: 'No se ha podido crer al docente'
      }
    }

    // Buscara contra la base de datos si existe un docente con este mismo usuario
    // const existeDocente = await 

    // return {
    //   codigoEstado: StatusCodes.BAD_REQUEST,
    //   mensaje: 'Ya existe un docente registrado con el mismo numero de empleado',
    //   entidad: null
    // }

    // const salt = await bcrypt.genSalt(10)

    // // Aqui va la logica para almadenar el docente nuevo en la base de datos
    // const usuarioCreado = await {docente, contrasenia}

    return {
      codigoEstado: StatusCodes.OK,
      mensaje: 'Docente creado con éxito!.'
    };
  }
}