import { Router }  from "express"
import { UserController } from "./user.controller.js"

const userRouter = Router()

const userController = new UserController()

// Crear un nuevo usuario
userRouter.post('/', userController.createUser)
userRouter.get('/')
// userRouter.get('/:id')
// userRouter.put('/:id')
// userRouter.delete('/:id')

export default userRouter
