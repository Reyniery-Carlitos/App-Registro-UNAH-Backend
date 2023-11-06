import { Router }  from "express"
import { LibroController } from "./libros.controller.js"
import upload from "../middlewars/almacenarArchivo.js"

const libroRouter = Router()

const libroController = new LibroController()

// Crear un nuevo usuario
libroRouter.post('/', upload.single('file'), libroController.createBook)
libroRouter.get('/', libroController.getBooks)
// userRouter.get('/:id')
// userRouter.put('/:id')
// userRouter.delete('/:id')

export default libroRouter
