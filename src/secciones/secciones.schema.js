import Joi from "joi";

export const schemaSecciones = Joi.object({
  asignatura_cod: Joi.string().min(1).max(12).required(),
  docente_n_empleado: Joi.string().min(10).max(11).required(),
  lunes: Joi.number().required(),
  martes: Joi.number().required(),
  miercoles: Joi.number().required(),
  jueves: Joi.number().required(),
  viernes: Joi.number().required(),
  sabado: Joi.number().required(),
  domingo: Joi.number().required(),
  hora_entrada: Joi.string().min(1).max(10).required(),
  hora_salida: Joi.string().min(1).max(10).required(),
  aula_id: Joi.string().min(1).max(8).required(),
  cupos: Joi.number().required(),
  duracion: Joi.string().min(1).max(2).required(),
})

export const schemaAumentarCupos = Joi.object({
  cupos: Joi.number().required(),
  seccion: Joi.string().required()
})
