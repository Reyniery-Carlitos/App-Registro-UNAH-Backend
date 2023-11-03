import Joi from "joi";

export const schemaAspirantes = Joi.object({
  dni: Joi.string().length(15).required(),
  carreraprincipal: Joi.string().length(8).required(),
  carrerasecundaria: Joi.string().length(8).required(),
  centroaplicado: Joi.string().length(8).required(),
  fotosecundaria: Joi.string().max(200).required()
})