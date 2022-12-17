import express from 'express'
import ProductsController from '../controllers/ProductsController'
import { authToken } from '../middleware/response_middleware'

const productsRouter = express.Router()
const productcontroller = new ProductsController()

productsRouter.get('/', productcontroller.getAll)
productsRouter.get('/:id', productcontroller.getById)
productsRouter.post('/create', authToken, productcontroller.create)
productsRouter.put('/:id', authToken, productcontroller.update)
productsRouter.delete('/:id', authToken, productcontroller.delete)
export default productsRouter
