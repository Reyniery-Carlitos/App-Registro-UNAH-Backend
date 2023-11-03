import Joi from "joi";

const schemaEdificios = Joi.object({
  id_edificios: Joi.string().length(8).required(),
  nombre_edificio: Joi.string().min(2).max(50).required() 
})