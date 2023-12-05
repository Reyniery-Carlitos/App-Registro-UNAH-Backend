import userModel from './user.model.js'
import bcrypt from 'bcrypt'
import validator from 'validator'
import StatusCodes from 'http-status-codes'

import generateToken from '../utils/generarToken.js'

export default class UserService{
  async create(userData) {
    const {username, email, password} = userData

    let user = await userModel.findOne({email})

    if (user) {
      return {
        statusCode: StatusCodes.BAD_REQUEST,
        data: null,
        message: 'Usuario con el email dado ya existe'
      }
    }

    if (!username || !email || !password) {
      return {
        statusCode: StatusCodes.BAD_REQUEST,
        data: null,
        message: 'Todos los campos son requeridos'
      }
    }

    if (!validator.isEmail(email)) {
      return {
        statusCode: StatusCodes.BAD_REQUEST,
        data: null,
        message: 'El email debe ser un email valido'
      }
    }

    if (!validator.isStrongPassword(password)) {
      return {
        statusCode: StatusCodes.BAD_REQUEST,
        data: null,
        message: 'La contrasenia debe ser una contrasenia fuerte'
      }
    }

    user = new userModel({username, email, password})

    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(user.password, salt)

    await user.save()

    const token = generateToken((user._id).toJSON())

    return {
      data: {userId: user._id, username,  email, token},
      message: 'Usuario creado correctamente',
      statusCode: StatusCodes.OK
    }
  }

  async getUserById (id) {
    if (!validator.isMongoId(id)) {
      return {
        statusCode: StatusCodes.BAD_REQUEST,
        data: null,
        message: `El id ${id} no es un id de mongo valido `
      }
    }
    
    const user = await userModel.findById(id).exec()

    if (!user) {
      return {
        statusCode: StatusCodes.NOT_FOUND,
        data: null,
        message: `Usuario con el id ${id} no existe`
      }
    }

    const {_id, email, username} = user

    return {
      statusCode: StatusCodes.OK,
      data: {userId: _id, username, email},
      message: 'Usuario devuelto con exito'
    }
  }

  async getAllUsers() {
    const users = await userModel.find({}).select('-password -createdAt -updatedAt -__v')

    if (!users) {
      return {
        statusCode: StatusCodes.NOT_FOUND,
        data: null,
        message: 'Ningun usuario ha sido encontrado'
      }
    }

    return {
      statusCode: StatusCodes.OK,
      data: users,
      message: 'Usuarios devueltos exitosamente'
    }
  }
}