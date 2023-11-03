import Joi from "joi";

const schemaCentrosRegionales = Joi.object({
  id_centro: Joi.string().length(8).required(),
  nombre_centro: Joi.string().min(4).max(40).required(),
  acronimo: Joi.string().min(4).max(20).required(),
  estudiantes_numero_cuenta: Joi.string().length(11).required(),
  aspirante_id: Joi.string().length(15).required(),
  edificios_id_edificio: Joi.string().length(8).required()
}) 