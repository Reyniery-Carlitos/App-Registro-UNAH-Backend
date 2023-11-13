import { Router } from "express";

import ControladorAdmisiones from "./admisiones.controller.js";
import validarJWT from "../middlewars/validarJWT.js";
import { esRolAdmin } from "../middlewars/validarRoles.js";
import { uploadCsv, errorHandler} from "../middlewars/almacenarArchivo.js";

const routerAdmisiones = Router()
const controladorAdmisiones = new ControladorAdmisiones()

routerAdmisiones.post('/cargar-notas', 
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
  }, 
  controladorAdmisiones.cargarNotas
)

routerAdmisiones.post('/registrar-estudiantes', 
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
  },
  controladorAdmisiones.registrarEstudiantes
)

routerAdmisiones.get('/estudiantes-admitidos', 
  validarJWT,
  esRolAdmin, 
  controladorAdmisiones.obtenerCsvAspirantesAprobados
)

export default routerAdmisiones