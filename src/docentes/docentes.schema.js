import Joi from "joi";

export const schemaDocentes = Joi.object({
  dni: Joi.string().length(13).required(),
  primer_nombre: Joi.string().min(3).max(20).required(),
  segundo_nombre: Joi.string().min(0).max(20),
  primer_apellido: Joi.string().min(3).max(20).required(),
  segundo_apellido: Joi.string().min(0).max(20),
  telefono: Joi.string().length(8).required(),
  direccion: Joi.string().min(3).max(50).required(),
  correo_electronico: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'hn']}}),
  foto_empleado: Joi.string().max(200).required(),
  rol_id: Joi.string().min(1).required(),
  carrera: Joi.string().min(1).required(),
  contrasenia: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{8,40}$')).required()
})