import express from 'express'
import ProductsController from '../controllers/ProductsController'
import { UsersModel } from '../models/users_model'

const productsRouter = express.Router()
const productcontroller = new ProductsController()
const userMode = new UsersModel()

productsRouter.get('/', userMode.authToken, productcontroller.getAll)
productsRouter.get('/:id', userMode.authToken, productcontroller.getById)
productsRouter.post('/create', userMode.authToken, productcontroller.create)
productsRouter.put('/:id', userMode.authToken, productcontroller.update)
productsRouter.delete('/:id', userMode.authToken, productcontroller.delete)
export default productsRouter
