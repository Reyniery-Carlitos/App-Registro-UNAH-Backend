import { request, response } from "express";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";

export default async function validarJWT(req = request, res = response, next) {
  try {
    const authorization = req.get("x-token");
    let token = null;

    if (authorization && authorization.toLowerCase().startsWith("bearer")) {
      token = authorization.substring(7);
    }

    const tokenDecodificado = jwt.verify(token, process.env.JWT_SECRET);

    if (!token || !tokenDecodificado) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ mensaje: "No hay token en la peticion" });
    }

    req.usuario = {rol: tokenDecodificado.rol, usuario: tokenDecodificado.username}

    next();
  } catch (err) {
    res.status(StatusCodes.UNAUTHORIZED).json({ mensaje: "Token no valido" });
  }
}
