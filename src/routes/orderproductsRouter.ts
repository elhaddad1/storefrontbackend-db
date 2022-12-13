import express from 'express'
import OrderProductsController from '../controllers/OrderProductsController'
import { UsersModel } from '../models/users_model'

const orderproductsRouter = express.Router()
const orderproductsController = new OrderProductsController()
const userMode = new UsersModel()

orderproductsRouter.get(
    '/getByOrderId/:id',
    userMode.authToken,
    orderproductsController.getByOrderId
)
orderproductsRouter.post(
    '/add',
    userMode.authToken,
    orderproductsController.add
)
orderproductsRouter.delete(
    '/:id',
    userMode.authToken,
    orderproductsController.delete
)
orderproductsRouter.delete(
    '/deleteByOrderId/:id',
    userMode.authToken,
    orderproductsController.deleteByOrderId
)
export default orderproductsRouter
