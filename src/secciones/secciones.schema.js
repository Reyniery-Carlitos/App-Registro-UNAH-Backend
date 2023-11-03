import Joi from "joi";


const schemaSecciones = Joi.object({
  id_seccion: Joi.string().length(8).required(),
  nombre_seccion: Joi.string().min(3).max(5).required(),
  hora_entrada: Joi.string().string().min(3).max(10).required(),
  hora_salida: Joi.string().string().min(3).max(10).required(),
  cupos: Joi.number().required(),
  anio: Joi.string().length(4).required(),
  periodo: Joi.string().min(1).max(20).required(),
  dias_seccion_id_dias: Joi.string().length(8).required()
})
