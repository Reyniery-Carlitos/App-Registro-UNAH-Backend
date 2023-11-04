import Joi from "joi";

export const schemaDocentes = Joi.object({
  dni: Joi.string().length(15).required(),
  primer_nombre: Joi.string().alphanum().min(3).max(20).required(),
  segundo_nombre: Joi.string().alphanum().min(3).max(20),
  primer_apellido: Joi.string().alphanum().min(3).max(20).required(),
  segundo_apellido: Joi.string().alphanum().min(3).max(20),
  telefono: Joi.string().length(8).required(),
  direccion: Joi.string().min(3).max(50).required(),
  correo_electronico: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'hn']}}),
  numero_empleado: Joi.string().length(11).required(),
  foto_empleado: Joi.string().max(200).required(),
  rol_id_rol: Joi.string().length(8).required(),
  centro_regional_id_centro: Joi.string().length(8).required(),
  contrasenia: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{8,40}$')).required()
})