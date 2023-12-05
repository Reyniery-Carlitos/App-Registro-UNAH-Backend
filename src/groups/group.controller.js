import {request, response} from 'express'
import StatusCodes from 'http-status-codes'

 

export default class GroupController {

  async crearGrupo(request,response){

    const { nombre } = request.body;
    const nuevoGrupo = 'INSERT INTO GRUPO (NOMBRE) VALUES(?)'
  
    try {
      connection.query(nuevoGrupo, [nombre]);
    } catch (e) {
      console.error(e);
      response.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }

  
  async mostrarGrupo  (request, response) {
    
  const selectQuery = `SELECT * FROM grupos INNER JOIN miembrosgrupo on miembrosgrupo.grupo_id = grupos.grupo_id WHERE usuario_id = ?`;
  try {
    const results = await new Promise((resolve, reject) => {
      connection.query(selectQuery, [request.params.userId], (error, results) => {
        if (error) {
          console.error(error);
          reject(error);
        } else {
          resolve(results);
        }
      });
    });

    response.status(StatusCodes.OK).json(arrayresults);
  } catch (e) {
    console.error(e);
    response.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
  }
}


  
}