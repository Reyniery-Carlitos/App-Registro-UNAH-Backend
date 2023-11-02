import {StatusCodes} from 'http-status-codes'
import {UserService}  from "./user.service.js"

const userService = new UserService()

export class UserController {
  // Crear un usuario
  async createUser(req, res) {
    try{
      const user = req.body
      const result = await userService.create(user) // Validaciones de datos
      
      res
      .status(result.statusCode)
      .json({
        message: result.message,
        data: {result: result.entity}
      })
    } catch(err) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Server error: ${error}`);
    }
  }

  // Obtener un usuario
  async getUser(req, res) {
    res
    .status(200)
    .json({
      message: 'Some message',
      data: {
        msg: 'Some message'
      }
    })
  }
}