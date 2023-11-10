import { Router } from "express";

import { ControladorAdmin } from "./admin.controller.js";
import validarJWT from "../middlewars/validarJWT.js";
import { esRolAdmin } from "../middlewars/validarRoles.js"; 
import { upload,uploadCsv, errorHandler } from "../middlewars/almacenarArchivo.js";

const routerAdmin = Router()
const controladorAdmin = new ControladorAdmin()

routerAdmin.post('/notas-aspirantes', 
  validarJWT,
  esRolAdmin,
  function (req, res, next){
    uploadCsv.single('notas_aspirantes')(req, res, function(err) {
      if (err) {
        return errorHandler(err, req, res, next)
      } else {
        next()
      }
    })
  }
, controladorAdmin.ingresarNotasAspirantes)

routerAdmin.post('/registrar-estudiantes', 
  validarJWT,
  esRolAdmin,
  function (req, res, next){
    uploadCsv.single('datos_estudiantes')(req, res, function(err) {
      if (err) {
        return errorHandler(err, req, res, next)
      } else {
        next()
      }
    })
  }
, controladorAdmin.registrarEstudiantes)

routerAdmin.post('/configuracion-periodo', 
validarJWT,
esRolAdmin,
controladorAdmin.configurarPeriodo)

export default routerAdmin