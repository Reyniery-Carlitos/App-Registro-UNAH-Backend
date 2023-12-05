import {Router} from "express";

import UserController from "./user.controller.js";

const userRouter = Router()
const userController = new UserController()

userRouter.post('/', userController.create)
userRouter.get('/:id', userController.getUserById)
userRouter.get('/', userController.getAllUsers)

export default userRouter