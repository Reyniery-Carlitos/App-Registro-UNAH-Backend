import {request, response} from 'express'
import { StatusCodes } from 'http-status-codes'

import { DocentesService } from "./docentes.service.js"

const docenteService = new DocentesService()

export class ControladorDocentes {
  async crear (req = request, res = response) {
    try {
      const infoDocente = req.body
      const docente = {...infoDocente, foto_empleado: '/public/' + req.file.filename}

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

  async descargarEstudiantesPorSeccion(req = request, res = response) {
    try {
      const seccion = req.query.seccionID
      
      const resultado = await docenteService.descargarEstudiantesSeccion(seccion)

      console.log(resultado.entidad)
      res
      .status(resultado.codigoEstado)
      .sendFile(resultado.entidad)
    } catch(err) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`No se encuentra la seccion`);
    }
  }

  async descargarPlanificacion(req = request, res = response) {
    try {
      const {usuario} = req.usuario
      
      const resultado = await docenteService.descargarPlanificacion(usuario)

      console.log(resultado.entidad)
      res
      .status(resultado.codigoEstado)
      .sendFile(resultado.entidad)
    } catch(err) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`No se encuentra la planificacion`);
    }
  }

  async descargarPlanificacion2(req = request, res = response) {
    try {
      const {usuario} = req.usuario
      
      const resultado = await docenteService.descargarPlanificacion2(usuario)

      console.log(resultado.entidad)
      res
      .status(resultado.codigoEstado)
      .sendFile(resultado.entidad)
    } catch(err) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`No se encuentra la planificacion`);
    }
  }

  
  async obtenerSolicitudesCambioCar(req = request, res = response) {
    try {
      const {usuario}= req.usuario;
      
      const resultado = await docenteService.obtenerSolicitudesCambioCar(usuario);

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

  async obtenerSolicitudesCambioCentro(req = request, res = response) {
    try {
      const {usuario} = req.usuario
  
      const resultado = await docenteService.obtenerSolicitudesCambioCentro(usuario)
  
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

  async visualizarPlanificacion(req = request, res = response) {
    try {
      const {usuario}= req.usuario;
      
      const resultado = await docenteService.visualizarPlanificacion(usuario);

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

  async actualizarSolicitudCambioCentro(req = request, res = response) {
    try {
      const solicitud= req.query.nsolicitud;
      const verificacion=req.query.actualizacion;
      
      const resultado = await docenteService.actualizarSolicitudCambioCentro(solicitud,verificacion);

      res
        .status(resultado.codigoEstado)
        .json({
          mensaje: resultado.mensaje
        });
    } catch (err) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Server error: ${err}`);
    }
  }

  async actualizarSolicitudCambioCarrera(req = request, res = response) {
    try {
      const solicitud= req.query.nsolicitud;
      const verificacion=req.query.actualizacion;
      
      const resultado = await docenteService.actualizarSolicitudCambioCarrera(solicitud,verificacion);

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


  async actualizarSolicitudCancelacion(req = request, res = response) {
    try {
      const solicitud= req.query.nsolicitud;
      const verificacion=req.query.actualizacion;
      
      const resultado = await docenteService.actualizarSolicitudCancelacion(solicitud,verificacion);

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

  async subirVideo(req = request, res = response) {
    try {
      const seccion = req.query.seccion
    console.log(seccion)
      const resultado = await docenteService.subirVideo({seccion, video: '/public/' + req.file.filename});

      res
        .status(resultado.codigoEstado)
        .json({
          mensaje: resultado.mensaje
        });
    } catch (err) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Server error: ${err}`);
    }
  }

  
  async obtenerCancelacionesExcepcionales(req = request, res = response) {
    try {
      const {usuario}= req.usuario;
     
      const resultado = await docenteService.obtenerCancelacionesExcepcionales(usuario);

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
