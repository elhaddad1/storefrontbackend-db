import express from 'express'
import { OrdersModel } from '../models/orders_model'

const productModel: OrdersModel = new OrdersModel()

export default class OrdersController {
    async getAll(_req: express.Request, res: express.Response) {
        try {
            const Orders = await productModel.getOrders()
            res.status(200).json(Orders)
        } catch (e) {
            res.status(500)
            res.json(e)
        }
    }

    async getById(req: express.Request, res: express.Response) {
        try {
            const product = await productModel.getOrderById(
                parseInt(req.params.id)
            )
            res.status(200).json(product)
        } catch (e) {
            res.status(500)
            res.json(e)
        }
    }

    async create(req: express.Request, res: express.Response) {
        try {
            const product = await productModel.createOrder({
                user_id: parseInt(req.params.user_id as string),
                status: req.body.status as string,
            })
            res.status(201).json(product)
        } catch (e) {
            res.status(500).json(e)
        }
    }

    async update(req: express.Request, res: express.Response) {
        try {
            const product = await productModel.updateOrder({
                id: parseInt(req.params.id as string),
                user_id: parseInt(req.params.user_id as string),
                status: req.body.status as string,
            })
            res.status(201).json(product)
        } catch (e) {
            res.status(500).json(e)
        }
    }

    async delete(req: express.Request, res: express.Response) {
        try {
            await productModel.deleteOrder(parseInt(req.params.id as string))
            res.status(200).json({
                status: `order ${req.params.id} has been deleted`,
            })
        } catch (e) {
            res.status(500).json(e)
        }
    }
}
