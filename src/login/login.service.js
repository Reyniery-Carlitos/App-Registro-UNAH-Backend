import bcrypt from 'bcrypt'
import { StatusCodes } from 'http-status-codes'; 
// import jwt from 'jsonwebtoken';

import { schemaLogin } from "./login.schema.js"
import { fnSPCUD } from '../utils/databaseFunctions.js';
import createPool from '../database/database.config.js'
import generarToken from '../utils/generarToken.js';

const pool = await createPool()

export class LoginService{
  async login (usuario) {
    const {error} = schemaLogin.validate(usuario)
    
    if (error) {
      return {
        codigoEstado: StatusCodes.BAD_REQUEST,
        mensaje: `Ocurrio un error al iniciar sesión: ${error}`,
        token: null
      };
    }
    
    const {username, contrasenia} = usuario
    // Aqui buscaria en la base de datos los valores de inicio de sesion

    // console.log(contraseniaBD)
    const inVARS = [username]
    const usuarioActual = await fnSPCUD(pool,"LOGIN_SP", inVARS);

    if (usuarioActual.mensaje === null) {
      return {
        codigoEstado: StatusCodes.NOT_FOUND,
        mensaje: 'Usuario o contraseña incorrecto!',
        token: null
      };
    }
    
    const contraseniaBD = usuarioActual.mensaje.split(' ')[1]
    const esContraseniaCorrecta = await bcrypt.compare(contrasenia, contraseniaBD);
    
    if (!esContraseniaCorrecta) {
      return {
        statusCode: StatusCodes.NOT_FOUND,
        mensaje: 'Usuario o contraseña incorrecto!',
        token: null
      };
    }

    const rolUsuario = {rol: usuarioActual.mensaje.split(' ')[0]}
    const token = generarToken({rol: rolUsuario, username: usuario.username})

    return {
      codigoEstado: StatusCodes.OK,
      mensaje: 'Se ha iniciado sesión exitosamente.',
      token,
      entidad: rolUsuario
    };
  }
}