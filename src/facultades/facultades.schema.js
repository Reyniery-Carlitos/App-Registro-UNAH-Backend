import Joi from "joi";

const schemaFacultades = Joi.object({
  id_facultad: Joi.string().length(8).required(),
  nombre_facultad: Joi.string().min(4).max(40).required()
})