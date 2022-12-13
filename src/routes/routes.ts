import express from 'express'
import ordersRouter from './ordersRouter'
import productsRouter from './productsRouter'
import usersRouter from './usersRouter'

const apiRouter = express.Router()

apiRouter.use('/users', usersRouter)
apiRouter.use('/products', productsRouter)
apiRouter.use('/orders', ordersRouter)
export default apiRouter
