import {request, response} from 'express'
import { StatusCodes } from 'http-status-codes'



export default class MessageController {


    
  async crearMensajeGrupo(request,response){

    const { grupo_id,	contenido	,enviado_por } = request.body;
    const nuevoMsgGrupo = 'INSERT INTO mensajes_grupo (grupo_id,	contenido	,enviado_por,	fecha_envio) VALUES(?,?,?,NOW())'
  
    try {
      connection.query(nuevoMsgGrupo, [grupo_id,	contenido	,enviado_por]);
    } catch (e) {
      console.error(e);
      response.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }

  

  
}