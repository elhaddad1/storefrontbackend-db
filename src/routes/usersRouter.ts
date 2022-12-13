import express from 'express'
import UsersController from '../controllers/UsersController'
import { UsersModel } from '../models/users_model'

const usersRouter = express.Router()
const usersController = new UsersController()
const userMode = new UsersModel()

usersRouter.get('/', usersController.getUsers)
usersRouter.get('/:id', usersController.getUserById)
usersRouter.post('/create', usersController.createUser)
usersRouter.put('/:id', userMode.authToken, usersController.updateUser)
usersRouter.delete('/:id', userMode.authToken, usersController.deleteUser)
export default usersRouter
