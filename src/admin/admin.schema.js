import Joi from "joi";

const fechaActual = new Date()
const anioActual = new Date().getFullYear()

export const schemaConfigurarPeriodo = Joi.object({
    p_fec_nota_ini: Joi.date().min(fechaActual).required(),
    p_fec_nota_fin: Joi.date().greater(Joi.ref('p_fec_nota_ini')).required(),
    p_periodo_periodo: Joi.number().required(),
    p_periodo_anio: Joi.date().iso('YYYY').min(anioActual).required(),
    p_periodo_duracion_id: Joi.number().required(),
    p_fec_ini_plan: Joi.date().min(fechaActual).required(),
    p_fec_final_plan: Joi.date().greater(Joi.ref('p_fec_ini_plan')).required(),
    p_fec_can_exp_ini: Joi.date().min(fechaActual).required(),
    p_fec_can_exp_fin: Joi.date().greater(Joi.ref('p_fec_can_exp_ini')).required(),
    p_fec_periodo_ini: Joi.date().min(fechaActual).required(),
    p_fec_periodo_fin: Joi.date().greater(Joi.ref('p_fec_periodo_ini')).required(),
  }
)