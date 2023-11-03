import Joi from "joi";

const schemaGrados = Joi.object({
  id_grado: Joi.string().length(8).required(),
  tipo: Joi.string().min(4).max(20).required(),
  carreras_id_carrera: Joi.string().length(8).required()
})