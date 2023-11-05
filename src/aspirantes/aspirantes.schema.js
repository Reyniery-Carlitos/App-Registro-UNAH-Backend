import Joi from "joi";

export const schemaAspirantes = Joi.object({
  dni: Joi.string().length(13).required(),
  primer_nombre: Joi.string().alphanum().min(3).max(20).required(),
  segundo_nombre: Joi.string().min(0).max(20),
  primer_apellido: Joi.string().alphanum().min(3).max(20).required(),
  segundo_apellido: Joi.string().min(0).max(20),
  telefono: Joi.string().length(8).required(),
  direccion: Joi.string().min(3).max(50).required(),
  correo_electronico: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'hn']}}),
  carrera_principal_id: Joi.string().min(1).required(),
  carrera_secundaria_id: Joi.string().min(1).required(),
  centro_id: Joi.string().min(1).required(),
  foto_certificado: Joi.string().max(200).required()
})