import { Router }  from "express"
import { LibroController } from "./libros.controller.js"

const libroRouter = Router()

const libroController = new LibroController()

// Crear un nuevo usuario
// userRouter.post('/', userController.createUser)
libroRouter.get('/', libroController.getBooks)
// userRouter.get('/:id')
// userRouter.put('/:id')
// userRouter.delete('/:id')

export default libroRouter
