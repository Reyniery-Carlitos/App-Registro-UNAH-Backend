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
    console.log(usuario)
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

async restablecerClave(req = request, res = response) {
  try {
    const DNI= req.query.DNI;
    
    const resultado = await estudianteService.restablecerClave(DNI);

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
    const resultado = await estudianteService.restablecerCuenta(usuario,contrasenia);

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

async solicitudCambioCarrea(req = request, res = response) {
  try {
    const {usuario} = req.usuario
    const infoCambioCarrera= req.body;


    const resultado = await estudianteService.solicitudCambioCarrea(usuario,infoCambioCarrera);

    res
      .status(resultado.codigoEstado)
      .json({
        mensaje: resultado.mensaje,
      });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Server error: ${err}`);
  }

}

async solicitudCambioCentro(req = request, res = response) {
  try {
    const {usuario} = req.usuario
    const infoCambioCentro= req.body;


    const resultado = await estudianteService.solicitudCambioCentro(usuario,infoCambioCentro);

    res
      .status(resultado.codigoEstado)
      .json({
        mensaje: resultado.mensaje,
      });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Server error: ${err}`);
  }

}


async solicitudCancelacion(req = request, res = response) {
  try {
    const {usuario} = req.usuario
    const infoCancelacion= req.body;

    const resultado = await estudianteService.solicitudCancelacion({usuario, infoCancelacion, foto_cancelacion: '/public/' + req.file.filename});

    res
      .status(resultado.codigoEstado)
      .json({
        mensaje: resultado.mensaje,
      });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Server error: ${err}`);
  }

}


async solicitudRepo(req = request, res = response) {
  try {
    const {usuario} = req.usuario
    const infoRepo= req.body;


    const resultado = await estudianteService.solicitudRepo(usuario,infoRepo);

    res
      .status(resultado.codigoEstado)
      .json({
        mensaje: resultado.mensaje,
      });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Server error: ${err}`);
  }

}

async obtenerSolicitudes(req = request, res = response) {
  try {
    const {usuario}= req.usuario;
    
    const resultado = await estudianteService.obtenerSolicitudes(usuario);

    res
      .status(resultado.codigoEstado)
      .json({
        mensaje: resultado.mensaje,
        infoSolicitud:resultado.entidad
      });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Server error: ${err}`);
  }
}


async obtenerHistorialAcademico2(req = request, res = response) {
  try {
    const usuario= req.query.estudiante;
    console.log(usuario)
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


async obtenerPerfil(req = request, res = response) {
  try {
    const {usuario} = req.usuario;
    const resultado = await estudianteService.obtenerPerfil(usuario);
   
    res
      .status(resultado.codigoEstado)
      .json({
        mensaje: resultado.mensaje,
        perfil:resultado.entidad,
        fotos:resultado.entidad2
      });
  } catch (err) {
    
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Server error: ${err}`);
  }
}

async subirFotoPerfil(req = request, res = response) {
  try {
    const {usuario} = req.usuario;
    const resultado = await estudianteService.subirFotoPerfil({usuario, foto_perfil: '/public/' + req.file.filename});
   
    res
      .status(resultado.codigoEstado)
      .json({
        mensaje: resultado.mensaje
      });
  } catch (err) {
    
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Server error: ${err}`);
  }
}


async agregarDescripcion(req = request, res = response) {
  try {
    const {usuario} = req.usuario;
    const descripcion=req.query.descripcion
    const resultado = await estudianteService.agregarDescripcion(usuario,descripcion);
   
    res
      .status(resultado.codigoEstado)
      .json({
        mensaje: resultado.mensaje,
      });
  } catch (err) {
    
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Server error: ${err}`);
  }
}

async descargarHistorial(req = request, res = response) {
  try {
    const {usuario} = req.usuario
    console.log(usuario);

    const resultado = await estudianteService.descargarHistorial(usuario)

    console.log(resultado.entidad)
    res
    .status(resultado.codigoEstado)
    .sendFile(resultado.entidad)
  } catch(err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err);
  }
}

}
