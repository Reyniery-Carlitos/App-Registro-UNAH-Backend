import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { schemaLogin } from "./login.schema"

export class LoginService{
  async login (usuario) {
    const {error} = schemaLogin.validate(usuario)

    if (error !== undefined) {
      return {
        codigoEstado: StatusCodes.BAD_REQUEST,
        mensaje: `Ocurrio un error al iniciar sesión: ${error}`,
        token: null,
        entidad: null
      };
    }

    // Aqui buscaria en la base de datos los valores de inicio de sesion
    // const usuarioActual = await 

    if (usuarioActual === null) {
      return {
        codigoEstado: StatusCodes.NOT_FOUND,
        mensaje: 'Usuario o contraseña incorrecto!',
        token: null,
        entidad: null
      };
    }

    const contraseniaCorrecta = await bcrypt.compare(usuario.contrasenia, usuarioActual.contrasenia);

    if (!contraseniaCorrecta) {
      return {
        codigoEstado: StatusCodes.NOT_FOUND,
        mensaje: 'Usuario o contraseña incorrecto!',
        token: null,
        entidad: null
      };
    }

    const token = jwt.sign({ idUsuario: usuarioActual.id, rol: usuarioActual.rol }, process.env.JWT_SECRET);

    return {
      codigoEstado: StatusCodes.OK,
      mensaje: 'Se ha iniciado sesión exitosamente.',
      token,
      entidad: usuarioActual
    };
  }
}