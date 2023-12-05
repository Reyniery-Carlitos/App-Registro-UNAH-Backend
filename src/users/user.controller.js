import {request, response} from 'express'
import StatusCodes from 'http-status-codes'

import UserService from './user.service.js'

const userService = new UserService()

export default class UserController{
  async create (req = request, res = response ) {
    try {
      const result = await userService.create(req.body)

      res
      .status(result.statusCode)
      .json({
        message: result?.message,
        data: result.data,
        status: result.statusCode
      })
    } catch(err) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Server error: ${err}`);
    }
  }

  async getUserById (req = request, res = response) {
    try {
      const {id} = req.params
      const result = await userService.getUserById(id)

      res
      .status(result.statusCode)
      .json({
        message: result?.message,
        data: result.data,
        status: result.statusCode
      })
    } catch(err) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Server error: ${err}`);
    }
  }

  async getAllUsers (req = request, res = response) {
    try {
      const result = await userService.getAllUsers()

      res
      .status(result.statusCode)
      .json({
        message: result?.message,
        data: result.data,
        status: result.statusCode
      })
    } catch(err) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Server error: ${err}`);
    }
  }
}