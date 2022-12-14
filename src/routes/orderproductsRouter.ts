import express from 'express'
import OrderProductsController from '../controllers/OrderProductsController'
import { authToken } from '../middleware/response_middleware'

const orderproductsRouter = express.Router()
const orderproductsController = new OrderProductsController()

orderproductsRouter.get(
    '/getByOrderId/:id',
    authToken,
    orderproductsController.getByOrderId
)
orderproductsRouter.post('/add', authToken, orderproductsController.add)
orderproductsRouter.delete('/:id', authToken, orderproductsController.delete)
orderproductsRouter.delete(
    '/deleteByOrderId/:id',
    authToken,
    orderproductsController.deleteByOrderId
)
export default orderproductsRouter
