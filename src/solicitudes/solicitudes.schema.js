import Joi from "joi"

const schemaSolicitudes = Joi.object({
  id_solicitudes: Joi.string().length(8).required(),
  descripcion: Joi.string().max(200).required(),
  tipo_solicitud_id_tipo: Joi.string().length(8).required(),
  estudiantes_numero_cuenta: Joi.string().length(11).required()
})