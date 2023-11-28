import {request, response} from 'express'
import { StatusCodes } from 'http-status-codes'

import { DocentesService } from "./docentes.service.js"

const docenteService = new DocentesService()

export class ControladorDocentes {
  async crear (req = request, res = response) {
    try {
      const infoDocente = req.body
      const docente = {...infoDocente, foto_empleado: '/public/' + req.file.filename}
      console.log(infoDocente)

      const resultado = await docenteService.crear(docente)

      res
        .status(resultado.codigoEstado)
        .json({
          mensaje: resultado.mensaje
        });
    } catch (err) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Server error: ${err}`);
    }
  }

  async obtenerDocentes(req = request, res = response) {
    try {
      const {usuario} = req.usuario
      const resultado = await docenteService.obtenerDocentes(usuario)

      res
        .status(resultado.codigoEstado)
        .json({
          mensaje: resultado.mensaje,
          data: resultado.entidad
        });
    } catch (err) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Server error: ${err}`);
    }
  }

  async obtenerDocentePorNEmpleado(req = request, res = response) {
    try {
      const {usuario} = req.usuario;
      
      const resultado = await docenteService.obtenerDocentePorNEmpleado(usuario)

      res
        .status(resultado.codigoEstado)
        .json({
          mensaje: resultado.mensaje,
          data: resultado.entidad
        });
    } catch (err) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Server error: ${err}`);
    }
  }

  async obtenerSeccionesPorDocente(req = request, res = response){
    try {
      const {usuario} = req.usuario
      
      const resultado = await docenteService.obtenerSeccionesPorDocente(usuario)

      res
        .status(resultado.codigoEstado)
        .json({
          mensaje: resultado.mensaje,
          data: resultado.entidad
        });
    } catch (err) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Server error: ${err}`);
    }
  }

  async obtenerInfoInicioJefe(req = request, res = response) {
    try {
      const {usuario} = req.usuario
      
      const resultado = await docenteService.obtenerInfoInicioJefe(usuario)

      res
        .status(resultado.codigoEstado)
        .json({
          mensaje: resultado.mensaje,
          data: resultado.entidad
        });
    } catch (err) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Server error: ${err}`);
    }
  }

  async obtenerEstudiantesPorSeccion(req = request, res = response) {
    try {
      const seccion = req.query.seccionID
      
      const resultado = await docenteService.obtenerEstudiantesPorSeccion(seccion)

      res
        .status(resultado.codigoEstado)
        .json({
          mensaje: resultado.mensaje,
          data: resultado.entidad
        });
    } catch (err) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Server error: ${err}`);
    }
  }

  async ingresarNotasPorDocente(req = request, res = response) {
    try {
      const infoNotas= req.body;
      
      const resultado = await docenteService.ingresarNotaPorDocente(infoNotas);

      res
        .status(resultado.codigoEstado)
        .json({
          mensaje: resultado.mensaje
        });
    } catch (err) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Server error: ${err}`);
    }
  }

  async obtenerSeccionesPorDocente2(req = request, res = response) {
    try {
      const docente = req.query.nEmpleado
      console.log(docente);
      const resultado = await docenteService.obtenerSeccionesPorDocente2(docente)

      res
        .status(resultado.codigoEstado)
        .json({
          mensaje: 'Secciones Obtenidas Correctamente',
          data: resultado.entidad
        });
    } catch (err) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Server error: ${err}`);
    }
  }
  async obtenerEvaluacionesaDocentes(req = request, res = response) {
    try {
      const seccion= req.query.seccionID;
      
      const resultado = await docenteService.obtenerEvaluacionesaDocentes(seccion);

      res
        .status(resultado.codigoEstado)
        .json({
          mensaje: resultado.mensaje,
          data:resultado.entidad
        });
    } catch (err) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Server error: ${err}`);
    }
  }



  async obtenerEstadisticas(req = request, res = response) {
    try {
      const {usuario}= req.usuario;
      
      const resultado = await docenteService.obtenerEstadisticas(usuario);

      res
        .status(resultado.codigoEstado)
        .json({
          mensaje: resultado.mensaje,
          data:resultado.entidad
        });
    } catch (err) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Server error: ${err}`);
    }
  }


  async restablecerClave(req = request, res = response) {
    try {
      const DNI= req.query.DNI;
      
      const resultado = await docenteService.restablecerClave(DNI);

      res
        .status(resultado.codigoEstado)
        .json({
          mensaje: resultado.mensaje,
          data:resultado.entidad
        });
    } catch (err) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Server error: ${err}`);
    }
  }

  async restablecerCuenta(req = request, res = response) {
    try {
      const {usuario}= req.usuario;
      const contrasenia = req.query.contrasenia;
      const resultado = await docenteService.restablecerCuenta(usuario,contrasenia);

      res
        .status(resultado.codigoEstado)
        .json({
          mensaje: resultado.mensaje,
          data:resultado.entidad
        });
    } catch (err) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Server error: ${err}`);
    }
  }


  async obtenerPerfilDocente(req = request, res = response) {
    try {
      const seccion= req.query.seccion;
      
      const resultado = await docenteService.obtenerPerfilDocente(seccion);
  
      res
        .status(resultado.codigoEstado)
        .json({
          mensaje: resultado.mensaje,
          data:resultado.entidad
        });
    } catch (err) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Server error: ${err}`);
    }
  }



}
