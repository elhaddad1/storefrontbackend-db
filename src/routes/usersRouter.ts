import express from 'express'
import UsersController from '../controllers/UsersController'
import { authToken } from '../middleware/response_middleware'

const usersRouter = express.Router()
const usersController = new UsersController()

usersRouter.get('/', usersController.getUsers)
usersRouter.get('/:id', usersController.getUserById)
usersRouter.post('/create', usersController.create)
usersRouter.put('/:id', authToken, usersController.update)
usersRouter.delete('/:id', authToken, usersController.delete)
export default usersRouter
