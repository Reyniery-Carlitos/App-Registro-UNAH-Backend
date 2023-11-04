import { schemaAspirantes } from "./aspirantes.schema"

export class AspirantesService{
  async crear(aspirante) {
    const {error} = schemaAspirantes.validate(aspirante)

    if (error) {
      return {
        codigoEstado: StatusCodes.BAD_REQUEST,
        mensaje: `Ocurrio un error al crear un nuevo docente: ${error}`,
        token: null,
        entidad: null
      };
    }

    const {dni, carreraprincipal, carrerasecundaria, fotosecundaria, centroaplicado, ...persona} = aspirante 
    // Persona se almacenara en la tabla persona, incluyendo el dni
    // El resto en la tabla aspirantes
    
    return {
      codigoEstado: StatusCodes.OK,
      mensaje: 'Docente creado con éxito!.',
      entidad: aspirante
    };
  }
}