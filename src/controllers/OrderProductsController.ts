import express from 'express'
import { OrderProductsModel } from '../models/orderproducts_model'

const orderProductsModel: OrderProductsModel = new OrderProductsModel()

export default class OrderProductsController {
    async getByOrderId(req: express.Request, res: express.Response) {
        try {
            const product = await orderProductsModel.getByOrderId(
                parseInt(req.params.id)
            )
            res.status(200).json(product)
        } catch (e) {
            res.status(500)
            res.json(e)
        }
    }

    async add(req: express.Request, res: express.Response) {
        try {
            if (!req.body.name) {
                return res.status(400).json({
                    error: 'Product name is required',
                })
            }
            const product = await orderProductsModel.addProductToOrder({
                order_id: parseInt(req.params.order_id as string),
                product_id: parseInt(req.params.product_id as string),
                quantity: parseInt(req.params.quantity as string),
            })
            res.status(201).json(product)
        } catch (e) {
            res.status(500).json(e)
        }
    }

    async delete(req: express.Request, res: express.Response) {
        try {
            await orderProductsModel.deleteByOrderId(
                parseInt(req.params.order_id as string)
            )
            res.status(200).json({
                status: `Item ${req.params.id} has been deleted`,
            })
        } catch (e) {
            res.status(500).json(e)
        }
    }

    async deleteByOrderId(req: express.Request, res: express.Response) {
        try {
            await orderProductsModel.deleteById(
                parseInt(req.params.id as string)
            )
            res.status(200).json({
                status: `Items for product ${req.params.id} have been deleted`,
            })
        } catch (e) {
            res.status(500).json(e)
        }
    }
}
