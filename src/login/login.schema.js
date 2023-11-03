import Joi from "joi";

export const schemaLogin = Joi.object({
  username: Joi.string().min(8).max(11).required(),
  contrasenia: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{8,40}$')).required(),
})