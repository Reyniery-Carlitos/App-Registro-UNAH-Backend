import Joi from "joi";

const schemaAulas = Joi.object({
  id_aula: Joi.string().length(8).required(),
  nombre_aula: Joi.string().min(4).max(40).required()
})