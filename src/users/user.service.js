// Aqui va la logica de consultas a la base de datos
import {StatusCodes} from 'http-status-codes'
import userSchema from "./user.schema.js"
import createPool from '../database/database.config.js'
// import { fnSPCUD, fnSPGet } from '../utils/databaseFunctions.js'

const pool = await createPool()

export class UserService {
  async create(user){
    const {error} = userSchema.validate(user)   

    // Aqui iria la misma logica de llamado a la base de datos

    if (error !== undefined){
      return {
        statusCode: StatusCodes.BAD_REQUEST,
        message: `Hubo un error de validación al actualizar el usuario: ${error.message}.`,
        entity: null
      }
    }

    return {
      statusCode: StatusCodes.OK,
      message: 'Usuario creado con éxito!.',
      entity: {user: 'User created'} // Aqui iria la data devuelta por la DB
    };
  }
}