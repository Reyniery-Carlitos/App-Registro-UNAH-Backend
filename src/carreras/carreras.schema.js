import Joi from "joi";

const schemaCarreras = Joi.object({
  id_carrera: Joi.string().min(8).max(8).required(),
  nombre_carrera: Joi.string().min(3).max(50).required(),
  facultad: Joi.string().min(8).max(8).required(),
  grado: Joi.string().min(8).max(8).required(),
  modalidad: Joi.string().min(8).max(8).required(),
  nota_requerida_paa: Joi.number().required(),
  examen_extra: Joi.String().min(8).max(8).required(),
  estudiantes_numero_cuenta: Joi.string().min(11).max(11).required(),
  examen_admision_id_ex_admision: Joi.string().min(8).max(8).required(),
  nota_examen_extra: Joi.number(),
  facultad_id_facultad: Joi.string().min(8).max(8).required(),
  asignaturas_id_asignaturas: Joi.string().min(8).max(8).required()  
})