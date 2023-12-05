import { StatusCodes } from "http-status-codes";
import {request, response} from 'express'
import connection from '../database/database.js';

export default class controladorChat {

  async crearChat(request,response){

    const { usuario1_id,usuario2_id } = request.body;
    const obtenerChat = 'SELECT * FROM CHAT WHERE  usuario1_id = ? AND usuario2_id = ?'
    const nuevoChat = 'INSERT INTO CHAT (usuario1_id,usuario2_id) VALUES(?,?)'
  
    try {
      connection.query(obtenerChat, [usuario1_id,usuario2_id], (error, results) => {
        if (error) {
          console.error(error);
          response.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
        } else {
          if (results.length = 0) {
              connection.query(nuevoChat, [usuario1_id,usuario2_id], (error, result) => {
                if (error) {
                  console.error(error);
                  response.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
                } else {
                  response.status(StatusCodes.CREATED).json({ id: result.insertId });
                }
              });
          }
        }
      });
    } catch (e) {
      console.error(e);
      response.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    }
  
  
  }

};






