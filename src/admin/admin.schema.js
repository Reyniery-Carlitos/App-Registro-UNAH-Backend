import Joi from "joi";

const fechaActual = new Date();
const anioActual = new Date().getFullYear();

export const schemaConfigurarPeriodo = Joi.object({
  p_fec_nota_ini: Joi.date().min(fechaActual).required(),
  p_fec_nota_fin: Joi.date().greater(Joi.ref("p_fec_nota_ini")).required(),
  p_periodo_periodo: Joi.number().required(),
  p_periodo_anio: Joi.date().iso("YYYY").min(anioActual).required(),
  p_periodo_duracion_id: Joi.string().required(),
  p_fec_ini_plan: Joi.date().min(fechaActual).required(),
  p_fec_final_plan: Joi.date().greater(Joi.ref("p_fec_ini_plan")).required(),
  p_fec_can_exp_ini: Joi.date().min(fechaActual).required(),
  p_fec_can_exp_fin: Joi.date().greater(Joi.ref("p_fec_can_exp_ini")).required(),
  p_fec_periodo_ini: Joi.date().min(fechaActual).required(),
  p_fec_periodo_fin: Joi.date().greater(Joi.ref("p_fec_periodo_ini")).required(),
});

export const schemaConfigurarMatricula = Joi.object({
  p_indice_inicio: Joi.number().min(1).max(100).required(),
  p_indice_final: Joi.number().greater(Joi.ref("p_indice_inicio")).required(),
  p_fecha_inicio: Joi.date().min(fechaActual).required(),
  p_fecha_final: Joi.date().greater(Joi.ref("p_fecha_inicio")).required(),
  p_nombre: Joi.string().required(),
  p_periodo_periodo: Joi.number().required(),
  p_periodo_anio: Joi.date().iso("YYYY").min(anioActual).required(),
  p_periodo_duracion_id: Joi.string().required()
});
