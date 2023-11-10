import { Router } from "express";
import { ControladorAspirantes } from "./aspirantes.controller.js";
// import multer from "multer";
// import { StatusCodes } from "http-status-codes";

import {upload, errorHandler } from "../middlewars/almacenarArchivo.js";

const routerAspirantes = Router()
const controladorAspirante = new ControladorAspirantes()

routerAspirantes.post('/', function (req, res, next){
  upload.single('foto_certificado')(req, res, function(err) {
    if (err) {
      return errorHandler(err, req, res, next)
    } else {
      next()
    }
  })
}, controladorAspirante.crear)

routerAspirantes.get('/:dni', controladorAspirante.obtenerPorDni)

export default routerAspirantes