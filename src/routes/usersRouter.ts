import express from 'express'
import UsersController from '../controllers/UsersController'
import { authToken } from '../middleware/response_middleware'

const usersRouter = express.Router()
const usersController = new UsersController()

usersRouter.get('/', usersController.getUsers)
usersRouter.get('/:id', usersController.getUserById)
usersRouter.post('/create', usersController.createUser)
usersRouter.put('/:id', authToken, usersController.updateUser)
usersRouter.delete('/:id', authToken, usersController.deleteUser)
export default usersRouter
