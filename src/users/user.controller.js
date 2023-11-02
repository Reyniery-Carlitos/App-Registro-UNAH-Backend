export class UserController {
  // Crear un usuario
  async createUser(req, res) {
    // Aqui iria el llamado a el archivo service que a su vez hace las consultas a la BD
    res
    .status(200)
    .json({
      message: 'Some message',
      data: {
        msg: 'Some message'
      }
    })
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