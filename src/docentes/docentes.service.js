import { StatusCodes } from "http-status-codes";
import bcrypt from 'bcrypt'

import { schemaDocentes } from "./docentes.schema.js"
import createPool from '../database/database.config.js'
import { fnSPCUD } from '../utils/databaseFunctions.js';
import OracleDB from "oracledb";

const pool = await createPool()

export class DocentesService {
  async crear (docente) {
    const {error} = schemaDocentes.validate(docente)
    console.log(error)


    if (error !== undefined) {
      return {
        codigoEstado: StatusCodes.BAD_REQUEST,
        mensaje: `Ocurrio un error al crear un nuevo docente: ${error.details[0].message}`,
        token: null
      };
    }

    const salt = await bcrypt.genSalt(10);
    const contrasenia = await bcrypt.hash(docente.contrasenia, salt) 
    
    const {dni, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, direccion, correo_electronico, foto_empleado, rol_id, carrera, telefono} = docente
    const inVARS = [dni, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, direccion, correo_electronico, contrasenia, foto_empleado, rol_id, carrera, telefono]
    
    const docenteActual = await fnSPCUD(pool, "CREAR_DOCENTE", inVARS);

    console.log(docenteActual.mensaje)
    if (docenteActual.mensaje === null) {
      return {
        codigoEstado: StatusCodes.BAD_REQUEST,
        mensaje: 'No se ha podido crear al docente'
      }
    }

    return {
      codigoEstado: StatusCodes.OK,
      mensaje: 'Docente creado con éxito!.'
    };
  }

  async obtenerDocentes(){
    const docentes = await (await pool.getConnection()).execute(`
      SELECT d.N_EMPLEADO, d.PERSONA_DNI, p.PRIMERNOMBRE, p.SEGUNDONOMBRE, p.PRIMERAPELLIDO, p.SEGUNDOAPELLIDO, p.CORREOELECTRONICO, p.DIRECCION, p.TELEFONO, d.FOTOEMPLEADO, r.ROL, c.NOM_CARRERA FROM DOCENTE d 
      INNER JOIN ROL r 
      ON r.ID = d.ROL_ID 
      INNER JOIN CARRERA c 
      ON d.CAR_DISPONIBLE_ID = c.ID 
      INNER JOIN PERSONA p 
      ON p.DNI = d.PERSONA_DNI 
    `, 
    [], 
    {outFormat: OracleDB.OUT_FORMAT_OBJECT})

    if (docentes.rows.length === 0) {
      return {
        codigoEstado: StatusCodes.NOT_FOUND,
        mensaje: `No se ha podido encontrar ningun docente en la base de datos`
      }
    }
  
    return {
      codigoEstado: StatusCodes.OK,
      mensaje: 'Docentes obtenidos correctamente',
      entidad: docentes.rows
    }
  }

  async obtenerDocentePorNEmpleado(nEmpleado){
    const docente = await (await pool.getConnection()).execute(`
      SELECT d.N_EMPLEADO, d.PERSONA_DNI, p.PRIMERNOMBRE, p.SEGUNDONOMBRE, p.PRIMERAPELLIDO, p.SEGUNDOAPELLIDO, p.CORREOELECTRONICO, p.DIRECCION, p.TELEFONO, d.FOTOEMPLEADO, r.ROL, c.NOM_CARRERA FROM DOCENTE d 
      INNER JOIN ROL r 
      ON r.ID = d.ROL_ID 
      INNER JOIN CARRERA c 
      ON d.CAR_DISPONIBLE_ID = c.ID 
      INNER JOIN PERSONA p 
      ON p.DNI = d.PERSONA_DNI 
      WHERE d.N_EMPLEADO = :nEmpleado
    `, 
    [nEmpleado], 
    {outFormat: OracleDB.OUT_FORMAT_OBJECT})

    if (docente.rows.length === 0) {
      return {
        codigoEstado: StatusCodes.NOT_FOUND,
        mensaje: `No se ha podido encontrar ningun docente en la base de datos`
      }
    }
  
    return {
      codigoEstado: StatusCodes.OK,
      mensaje: 'Docente obtenido correctamente',
      entidad: docente.rows
    }
  }
}