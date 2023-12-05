import { Router } from "express";

import ContactController from "./contact.controller.js";

const contactRouter = Router()

contactRouter.post('/agregar', ContactController.addContact)
contactRouter.get('/:userId', ContactController.getContactsByUserId)
contactRouter.get('/solicitud/:id&:userId&:contactoId&:estado', ContactController.updateContact)

export default contactRouter