import Joi from "joi";

const schemaAdmin = Joi.object({
  dni: Joi.string().length(15).required(),
  id_admin: Joi.string().length(11).required(),
  contrasenia: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{8,40}$')).required()
})