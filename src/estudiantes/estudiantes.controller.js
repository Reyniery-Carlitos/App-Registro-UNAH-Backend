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
async obtenerEstudiantesMatriculados(req = request, res = response) {
  
  try {
    const resultado = await estudianteService.obtenerEstudiantesMatriculados()
   
    res
      .status(resultado.codigoEstado)
      .json({
        mensaje: "Estudiantes Obtenidos Correctamente",
        data: resultado.entidad
      });
  } catch (err) {
    
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Server error: ${err}`);
  }
}

async obtenerPerfilMatricula(req = request, res = response) {
  try {
    const {usuario} = req.usuario;
    const resultado = await estudianteService.obtenerPerfilMatricula(usuario);

    res
      .status(resultado.codigoEstado)
      .json({
        mensaje: "Perfil Obtenido correctamente",
        perfil: resultado.entidad,
        clases:resultado.entidad2
      });
  } catch (err) {
    
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Server error: ${err}`);
  }
}

async obtenerSeccionesParaMatricular(req = request, res = response) {
  
  try {
    const {usuario} = req.usuario;
    const resultado = await estudianteService.obtenerSeccionesParaMatricular(usuario)
   
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


async cancelarSeccionEstudiante(req = request, res = response) {
  try {
    const {usuario} = req.usuario;
    const seccion = req.query.seccionID
    const resultado = await estudianteService.cancelarSeccionEstudiante(usuario,seccion);
   
    res
      .status(resultado.codigoEstado)
      .json({
        mensaje: resultado.mensaje,
      });
  } catch (err) {
    
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Server error: ${err}`);
  }
}

async adicionarSeccionEstudiante(req = request, res = response) {
  try {
    const {usuario} = req.usuario;
    const seccion = req.query.seccionID
    const resultado = await estudianteService.adicionarSeccionEstudiante(usuario,seccion);
   
    res
      .status(resultado.codigoEstado)
      .json({
        mensaje: resultado.mensaje,
      });
  } catch (err) {
    
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Server error: ${err}`);
  }
}


async obtenerHistorialAcademico(req = request, res = response) {
  try {
    const {usuario}= req.usuario;
    
    const resultado = await estudianteService.obtenerHistorialAcademico(usuario);

    res
      .status(resultado.codigoEstado)
      .json({
        mensaje: resultado.mensaje,
        infoestudiante:resultado.entidad,
        estudiante:resultado.entidad2
      });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Server error: ${err}`);
  }
}
}
