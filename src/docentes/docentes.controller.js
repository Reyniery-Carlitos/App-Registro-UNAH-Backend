import { DocentesService } from "./docentes.service.js"

const docenteService = new DocentesService()

export class ControladorDocentes {
  async crear (req, res) {
    try {
      const docente = req.body

      const resultado = await docenteService.crear(docente)

      res
        .status(StatusCodes.OK)
        .json({
          mensaje: resultado.message,
          data: { resultado: resultado.entidad }
        });
    } catch (err) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Server error: ${error}`);
    }
  }
}