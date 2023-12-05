import {request, response} from 'express'
import { StatusCodes } from "http-status-codes";
import connection from '../database/database.js';
import transporter from '../utils/transporter.js';

// Envia solicitud de contacto recibiendo userId y contactoId

export const addContact = async (request, response) => {

  console.log(request.body);

  //si id usuario es igual a id contacto
  if (request.body.usuario_id === request.body.contacto_usuario_id) {
    response.status(StatusCodes.CONFLICT).json({ error: 'No puede agregarse a si mismo como contacto' });
    return;
  }

  //si id usuario o id contacto estan vacios
  if (!request.body.usuario_id || !request.body.contacto_usuario_id) {
    response.status(StatusCodes.BAD_REQUEST).json({ error: 'El id del usuario o el id del contacto no pueden estar vacios' });
    return;
  }

  //si id usuario o id contacto no existen
  /*const selectQueryExist = `SELECT * FROM usuarios WHERE user_id = ? OR user_id = ?`;
  try {
    connection.query(selectQueryExist, [request.body.usuario_id, request.body.contacto_usuario_id], (error, results) => {
      if (error) {
        console.error(error);
        response.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
      } else {
        if (results.length < 2) {
          response.status(StatusCodes.NOT_FOUND).json({ error: 'El usuario o el contacto no existen' });
        } else {
          addContactToDatabase(request, response);
        }
      }
    });
  }
  catch (e) {
    console.error(e);
    response.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
  }*/
  

  const { usuario_id, contacto_usuario_id } = request.body;
  const selectQuery = `SELECT * FROM contactos WHERE usuario_id = ? AND contacto_usuario_id = ?`;
  const insertQuery = `INSERT INTO contactos (usuario_id, contacto_usuario_id, estado) VALUES (?, ?, ?)`;
  try {
    connection.query(selectQuery, [usuario_id, contacto_usuario_id], (error, results) => {
      if (error) {
        console.error(error);
        response.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
      } else {
        if (results.length > 0) {
          response.status(StatusCodes.CONFLICT).json({ error: 'El contacto ya existe en su lista de contactos' });
        } else {
          connection.query(insertQuery, [usuario_id, contacto_usuario_id, 'pendiente'], (error, result) => {
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

  //envia un correo al usuario que envia la solicitud
  const selectQuery1 = `SELECT * FROM usuarios WHERE user_id = ?`;
const selectQuery2 = `SELECT * FROM contactos WHERE usuario_id = ? AND contacto_usuario_id = ?`;

try {
  // Primera consulta
  const results1 = await new Promise((resolve, reject) => {
    connection.query(selectQuery1, [request.body.contacto_usuario_id], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });

  if (results1.length < 1) {
    return response.status(StatusCodes.NOT_FOUND).json({ error: 'El usuario no existe' });
  }

  // Segunda consulta
  const results2 = await new Promise((resolve, reject) => {
    connection.query(selectQuery2, [request.body.usuario_id, request.body.contacto_usuario_id], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });

  if (results2.length < 1) {
    return response.status(StatusCodes.NOT_FOUND).json({ error: 'El contacto no existe' });
  }

  // Tercera consulta
  const results3 = await new Promise((resolve, reject) => {
    connection.query(selectQuery1, [results2[0].contacto_usuario_id], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });

  if (results3.length < 1) {
    return response.status(StatusCodes.NOT_FOUND).json({ error: 'El usuario no existe' });
  }
  
  const mailOptions = {
    from: 'unahproyecto6@gmail.com',
    to: results3[0].correo,
    subject: 'SOLICITUD DE CONTACTO',
    html: `
      <p>TIENE UNA NUEVA SOLICITUD DE: ${request.body.usuario_id} PARA AGREGARLO COMO CONTACTO</p>
      <p>PARA ACEPTAR, HAGA CLICK EN EL SIGUIENTE BOTÓN:</p>
      <a href="http://192.168.191.114:3002/api/v1/chat/contacts/solicitud/${results2[0].contacto_id}&${request.body.usuario_id}&${request.body.contacto_usuario_id}&aceptado">
        <button style="background-color: green; color: white; padding: 10px 20px; border: none; cursor: pointer;">Aceptar</button>
      </a>
      <p>PARA RECHAZAR, HAGA CLICK EN EL SIGUIENTE BOTÓN:</p>
      <a href="http://192.168.191.114:3002/api/v1/chat/contacts/solicitud/${results2[0].contacto_id}&${request.body.usuario_id}&${request.body.contacto_usuario_id}&rechazado">
        <button style="background-color: red; color: white; padding: 10px 20px; border: none; cursor: pointer;">Rechazar</button>
      </a>
    `
  };

  // Envío del correo
  const info = await transporter.sendMail(mailOptions);
  console.log('Email sent: ' + info.response);

  // Respuesta exitosa
  //response.sendStatus(StatusCodes.OK);
} catch (error) {
  console.error(error);
}
};

// Obtener contactos de un usuario segun userId
//json array de resultados
let arrayresults = [];
export const getContactsByUserId = async (request, response) => {
  //obtiene los contactos del usuario
  const selectQuery = `SELECT * FROM contactos WHERE usuario_id = ?`;
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

    //obtiene los datos de los contactos
    const arrayresults = await Promise.all(results.map(async (element) => {
      const selectQuery = `SELECT * FROM usuarios WHERE user_id = ?`;
      const userResults = await new Promise((resolve, reject) => {
        connection.query(selectQuery, [element.contacto_usuario_id], (error, results) => {
          if (error) {
            console.error(error);
            reject(error);
          } else {
            resolve(results);
          }
        });
      });

      element.nombre = userResults[0].nombre;
      element.correo = userResults[0].correo;

      return element;
    }));

    response.status(StatusCodes.OK).json(arrayresults);
  } catch (e) {
    console.error(e);
    response.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

//Aceptar o rechazar solicitud de contacto recibiendo userId y estado de la URL
export const updateContact = async (request, response) => {
  const contactId = request.params.id;

  try {
  
    const updateQuery = `UPDATE contactos SET estado = ? WHERE contacto_id = ?`;
    connection.query(updateQuery, [request.params.estado, contactId], (error, results) => {
      if (error) {
        console.error(error);
        response.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
      } else {

        //si la solicitud es aceptada
        if (request.params.estado === 'aceptado') {
          //inserta el contacto en la lista de contactos del usuario
          const insertQuery = `INSERT INTO contactos (usuario_id, contacto_usuario_id, estado) VALUES (?, ?, ?)`;
          connection.query(insertQuery, [request.params.contactoId, request.params.userId, 'aceptado'], (error, result) => {
            if (error) {
              console.error(error);
              response.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
            } else {
              response.status(StatusCodes.CREATED).json({ id: 'Aceptado. Cierre esta ventana' });
             
            }
          });
        }

        //si la solicitud es rechazada
        if (request.params.estado === 'rechazado') {
          //elimina la solicitud de contacto
          const deleteQuery = `DELETE FROM contactos WHERE contacto_id = ? AND estado = 'pendiente'`;
          connection.query(deleteQuery, [contactId], (error, result) => {
            if (error) {
              console.error(error);
              response.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
            } else {
              response.status(StatusCodes.CREATED).json({ message: 'Rechazado, cierre esta ventana' });
              
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

export default {
  addContact,
  getContactsByUserId,
  updateContact
};