import express from 'express'
import OrdersController from '../controllers/OrderController'
import { UsersModel } from '../models/users_model'

const ordersRouter = express.Router()
const ordercontroller = new OrdersController()
const userMode = new UsersModel()

ordersRouter.get('/', userMode.authToken, ordercontroller.getAll)
ordersRouter.get('/:id', userMode.authToken, ordercontroller.getById)
ordersRouter.post('/create', userMode.authToken, ordercontroller.create)
ordersRouter.put('/:id', userMode.authToken, ordercontroller.update)
ordersRouter.delete('/:id', userMode.authToken, ordercontroller.delete)
export default ordersRouter
