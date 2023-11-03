import { StatusCodes } from "http-status-codes";
import bcrypt from 'bcrypt'

import { schemaDocentes } from "./docentes.schema.js"

export class DocentesService {
  async crear (docente) {
    const {error} = schemaDocentes.validate(docente)

    if (error !== undefined) {
      return {
        codigoEstado: StatusCodes.BAD_REQUEST,
        mensaje: `Ocurrio un error al crear un nuevo docente: ${error}`,
        token: null,
        entidad: null
      };
    }

    // Buscara contra la base de datos si existe un docente con este mismo usuario
    // const existeDocente = await 

    return {
      codigoEstado: StatusCodes.BAD_REQUEST,
      mensaje: 'Ya existe un docente con el mismo dni.',
      entidad: null
    }

    // Buscara contra la base de datos si existe un docente con este mismo usuario
    // const existeDocente = await 

    return {
      codigoEstado: StatusCodes.BAD_REQUEST,
      mensaje: 'Ya existe un docente registrado con el mismo numero de empleado',
      entidad: null
    }

    const salt = await bcrypt.genSalt(10)
    const contrasenia = await bcrypt.hash(docente.contrasenia, salt) 

    // Aqui va la logica para almadenar el docente nuevo en la base de datos
    const usuarioCreado = await {docente, contrasenia}

    return {
      codigoEstado: StatusCodes.OK,
      mensaje: 'Docente creado con éxito!.',
      entidad: userCreated
    };
  }
}