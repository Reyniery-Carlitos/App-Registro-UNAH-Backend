import {request, response} from 'express'
import { leerCSV } from "../utils/leerCSV";

export class ControladorEstudiantes {
  async crearEstudiantes(req = request, res = response) {
    // Lee el archivo csv de la req para luego ordenarlos y crear los estudiantes a partir de los aspirantes pasados
    leerCSV("pruebas.csv")
      .then((data) => {
        data.sort((a, b) => a.apellido.localeCompare(b.apellido));
      })
      .catch((err) => console.log(err));
  }
}
