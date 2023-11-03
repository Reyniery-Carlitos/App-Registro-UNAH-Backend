import Joi from "joi";

const schemaAsignaturas = Joi.object({
  id_asignaturas: Joi.string().length(8).required(),
  nombre_asignatura: Joi.string().min(4).max(50).required(),
  uv: Joi.number().required(),  
})