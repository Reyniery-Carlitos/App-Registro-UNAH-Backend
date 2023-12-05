import { Router } from "express";
import controladorChat from './chat.controller.js'

const chatRouter = Router()
const ControladorChat = new controladorChat()


chatRouter.post('/crearChat', ControladorChat.crearChat)



export default chatRouter