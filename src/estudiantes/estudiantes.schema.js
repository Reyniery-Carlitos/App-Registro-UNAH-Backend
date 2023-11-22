import Joi from "joi";

const schemaEstudiantes = Joi.object({
  dni: Joi.string().length(15).required(),
  numero_cuenta: Joi.string().length(11).required(),
  carrera: Joi.string().length(8).required(),
  certificados_id_certificado: Joi.string().length(8).required(),
  contrasenia: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{8,40}$')).required(),
  descripcion: Joi.string().max(200).required(),
})


export  const schemaEvaluacionDocente = Joi.object({
  id: Joi.string().min(1).max(15).required(),
  observaciones: Joi.string().min(1).max(200).required(),
  area_personal: Joi.number().required(),
  area_profesional: Joi.number().required(),
  area_academico: Joi.number().required(),
})

