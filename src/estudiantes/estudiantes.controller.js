import {request, response} from 'express'
import { StatusCodes } from 'http-status-codes'
import { leerCSV } from "../utils/leerCSV.js";
import {EstudianteServices} from "./estudiantes.service.js";


const estudianteService = new EstudianteServices();

export class ControladorEstudiantes {

  async crearEstudiantes(req = request, res = response) {
    // Lee el archivo csv de la req para luego ordenarlos y crear los estudiantes a partir de los aspirantes pasados
    leerCSV("pruebas.csv")
      .then((data) => {
        data.sort((a, b) => a.apellido.localeCompare(b.apellido));
      })
      .catch((err) => console.log(err));
  }

  async actualizarDatos(req = request, res = response) {
    
  }

  async obtenerSeccionesPorEstudiante(req = request, res = response) {
  
      try {
        const {usuario} = req.usuario
  
        const resultado = await estudianteService.obtenerSeccionesPorEstudiante(usuario)
       
        res
          .status(resultado.codigoEstado)
          .json({
            mensaje: "Secciones obtenidas correctamente",
            data: resultado.entidad
          });
      } catch (err) {
        
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Server error: ${err}`);
      }
  }

  async evaluarDocentePorEstudiante(req = request, res = response) {
    try {
      const {usuario} = req.usuario
      const infoEvaluacion= req.body;


      const resultado = await estudianteService.evaluarDocentePorEstudiante(usuario,infoEvaluacion);

      res
        .status(resultado.codigoEstado)
        .json({
          mensaje: resultado.mensaje,
        });
    } catch (err) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Server error: ${err}`);
    }

  }

  async obtenerNotasPorEstudiante(req = request, res = response) {
  
    try {
      const {usuario} = req.usuario

      const resultado = await estudianteService.obtenerNotasPorEstudiante(usuario)
     
      res
        .status(resultado.codigoEstado)
        .json({
          mensaje: "Secciones con obtenidas correctamente",
          data: resultado.entidad
        });
    } catch (err) {
      
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Server error: ${err}`);
    }
}

}
