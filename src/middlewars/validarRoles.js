import { request, response } from "express";
import { StatusCodes } from "http-status-codes";

export const esRolAdmin = (req = request, res = response, next) => {
  if (!req.usuario) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      mensaje: "Se quiere verificar el role sin validar el token primero",
    });
  }

  const { rol } = req.usuario;
  console.log(rol)
  if (rol !== "Administrador") {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      mensaje: `${rol} no es administrador`,
    });
  }

  next();
};

export const esRolCoordinador = (req = request, res = response, next) => {
  if (!req.usuario) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      mensaje: "Se quiere verificar el role sin validar el token primero",
    });
  }

  const { idUsuario, rol } = req.usuario;
  if (rol !== "Coordinador") {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      mensaje: `${idUsuario} no es coordinador`,
    });
  }

  next();
}

export const esRolJefeDepto = (req = request, res = response, next) => {
  if (!req.usuario) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      mensaje: "Se quiere verificar el role sin validar el token primero",
    });
  }

  const { idUsuario, rol } = req.usuario;
  if (rol !== "Jefe") {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      mensaje: `${idUsuario} no es jefe de departamento`,
    });
  }

  next();
}

export const esRolAdminOJefe = (req = request, res = response, next) => {
  if(req.esRolAdmin || req.esRolJefeDepto) {

    next()
  } else {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      mensaje: `${idUsuario} no es ni administrador ni jefe de departamento`,
    });
  } 
}