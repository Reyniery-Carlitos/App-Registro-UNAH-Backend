import Joi from "joi"

const schemaRoles = Joi.object({
  id_rol: Joi.string().length(8).required(),
  rol: Joi.string().min(4).max(50).required()
})