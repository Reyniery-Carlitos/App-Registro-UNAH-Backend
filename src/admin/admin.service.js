import { StatusCodes } from "http-status-codes";
import path from "node:path";

import createPool from "../database/database.config.js";
import { fnSPCUD, fnSPGet } from "../utils/databaseFunctions.js";
import { schemaConfigurarMatricula, schemaConfigurarPeriodo } from "./admin.schema.js";
// import formatearFecha from '../utils/formatearFechas.js'


const pool = await createPool()

export class AdminService {
  async configurarPeriodo(data) {
    const {periodo, matricula} = data
    const {error} = schemaConfigurarPeriodo.validate(periodo)

    if (error) {
      return {
        codigoEstado: StatusCodes.BAD_REQUEST,
        mensaje: `Ocurrio un error al crear una nueva configuracion del periodo: ${error.details[0].message}`,
        token: null
      };
    }
  
    for(let item of matricula){
      const {error: error2} = schemaConfigurarMatricula.validate(item)

      if (error2) {
        return {
          codigoEstado: StatusCodes.BAD_REQUEST,
          mensaje: `Ocurrio un error al crear una nueva configuracion de matricula: ${error2.details[0].message}`,
          token: null
        };
      }
    }

    const {
      p_fec_nota_ini,
      p_fec_nota_fin,
      p_periodo_periodo,
      p_periodo_anio,
      p_periodo_duracion_id,
      p_fec_ini_plan,
      p_fec_final_plan,
      p_fec_can_exp_ini,
      p_fec_can_exp_fin,
      p_fec_periodo_ini,
      p_fec_periodo_fin
    } = data.periodo;

    const nuevoPeriodo = await fnSPCUD(pool, "INGRESAR_PERIODO", [
      p_fec_nota_ini,
      p_fec_nota_fin,
      p_periodo_periodo,
      p_periodo_anio,
      p_periodo_duracion_id,
      p_fec_ini_plan,
      p_fec_final_plan,
      p_fec_can_exp_ini,
      p_fec_can_exp_fin,
      p_fec_periodo_ini,
      p_fec_periodo_fin
    ]);

    if (nuevoPeriodo === null) {
      return {
        codigoEstado: StatusCodes.BAD_REQUEST,
        mensaje: `Algun dato invalido`,
      };
    }  

    for(let item of matricula){
      const resMatricula = await fnSPCUD(pool, "INSERTAR_EN_CONF_MATRICULA", [
        item.p_indice_inicio,
        item.p_indice_final,
        item.p_fecha_inicio,
        item.p_fecha_final,
        item.p_nombre,
        item.p_periodo_periodo,
        item.p_periodo_anio,
        item.p_periodo_duracion_id
      ]);

      if (resMatricula === null) {
        return {
          codigoEstado: StatusCodes.BAD_REQUEST,
          mensaje: `Algun dato invalido`,
        };
      }
    }                                                                                                                                   

    return {
      codigoEstado: StatusCodes.OK,
      mensaje: `Nuevo periodo configurado correctamente`,
    };
  }

  async obtenerInfoSigPeriodo(tipoPeriodo){
    const estructureSP = ["PERIODO", "ANIO"]
    const dataPeriodo = await fnSPGet(pool, "SP_SIGUIENTE_PERIODO", estructureSP, [tipoPeriodo])

    return {
      codigoEstado: StatusCodes.OK,
      mensaje: 'Datos del periodo obtenidos correctamente',
      entidad: dataPeriodo
    }
  }


  async obtenerDepartamentosCentros(ID){
    const estructureSP = ["ID", "NOMBRE"]
    const dataPeriodo = await fnSPGet(pool, "DEPTOS_CENTRO", estructureSP, [ID])

    return {
      codigoEstado: StatusCodes.OK,
      mensaje: 'Departamentos obtenidos exitosamente',
      entidad: dataPeriodo
    }
  }
}
