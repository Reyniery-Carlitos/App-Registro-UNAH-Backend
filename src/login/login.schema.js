import Joi from "joi";

export const schemaLogin = Joi.object({
  username: Joi.string().min(4).max(11).required(),
  contrasenia: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,40}$')).required(),
})