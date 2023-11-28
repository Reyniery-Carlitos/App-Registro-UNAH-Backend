import { request, response } from "express";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";

export default async function validarJWT2(req = request, res = response, next) {
  try {
    const token= req.query.token;
   
    const tokenDecodificado = jwt.verify(token, "secretpassword");

    if (!token || !tokenDecodificado) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ mensaje: "No hay token en la peticion" });
    }
    
   
   
    req.usuario = {usuario: tokenDecodificado.usuario}
   
    next();
  } catch (err) {
    res.status(StatusCodes.UNAUTHORIZED).json({ mensaje: "Token no valido" });
  }
}