import {StatusCodes} from 'http-status-codes'
import {LibrosService}  from "./libros.service.js"

const libroService = new LibrosService()

export class LibroController {
  // Crear un usuario
  async createBook(req, res) {
    try{
      const book = req.body
      console.log(req.file.filename)
      // console.log(req.body)
      // const result = await userService.create(book) // Validaciones de datos


      res.status(StatusCodes.OK).json({mensaje: 'Libro creado'})
      // res
      // .status(result.statusCode)
      // .json({
      //   message: result.message,
      //   data: {result: result.entity}
      // })
    } catch(err) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Server error: ${error}`);
    }
  }

  // Obtener todos los libros
  async getBooks(req, res) {
    try{
      const result = await libroService.getAll()

      res
      .status(result.statusCode)
      .json({
        message: result.message,
        data: {result: result.entity}
      })

    } catch(error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Server error: ${error}`);
    }
  }
}