import Joi from "joi";

export const schemaAspirantes = Joi.object({
  dni: Joi.string().length(15).required(),
  primer_nombre: Joi.string().alphanum().min(3).max(20).required(),
  segundo_nombre: Joi.string().alphanum().min(3).max(20),
  primer_apellido: Joi.string().alphanum().min(3).max(20).required(),
  segundo_apellido: Joi.string().alphanum().min(3).max(20),
  telefono: Joi.string().length(8).required(),
  direccion: Joi.string().min(3).max(50).required(),
  correo_electronico: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'hn']}}),
  carreraprincipal: Joi.string().length(8).required(),
  carrerasecundaria: Joi.string().length(8).required(),
  centroaplicado: Joi.string().length(8).required(),
  fotosecundaria: Joi.string().max(200).required()
})