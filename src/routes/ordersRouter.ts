import express from 'express'
import OrdersController from '../controllers/OrderController'
import { authToken } from '../middleware/response_middleware'

const ordersRouter = express.Router()
const ordercontroller = new OrdersController()

ordersRouter.get('/', authToken, ordercontroller.getAll)
ordersRouter.get('/:id', authToken, ordercontroller.getById)
ordersRouter.post('/create', authToken, ordercontroller.create)
ordersRouter.put('/:id', authToken, ordercontroller.update)
ordersRouter.delete('/:id', authToken, ordercontroller.delete)
export default ordersRouter
