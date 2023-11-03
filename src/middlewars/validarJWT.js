import { request, response } from "express"
import { StatusCodes } from "http-status-codes";
import jwt from 'jsonwebtoken'

export default async function validarJWT(req = request, res = response, next) {
  const token = req.header('x-token')

  if (!token) {
    return res.status(StatusCodes.UNAUTHORIZED).json({mensaje: 'No hay token en la peticion'})
  }

  try{
    const {idUsuario} = jwt.verify(token, process.env.JWT_SECRET)

    // Debe buscar en la base de datos si existe el usuario con ese id
    // const usuario = await 
    if (!usuario) {
      return res.status(StatusCodes.UNAUTHORIZED).json({mensaje: 'Usuario no existe en la DB'})
    }

    req.usuario = usuario
    next()
  } catch(err) {
    res.status(StatusCodes.UNAUTHORIZED).json({mensaje: 'Token no valido'})
  }
}