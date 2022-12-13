import express from 'express'
import { ProductsModel } from '../models/products_model'

const productModel: ProductsModel = new ProductsModel()

export default class ProductsController {
    async getAll(_req: express.Request, res: express.Response) {
        try {
            const products = await productModel.getProducts()
            res.status(200).json(products)
        } catch (e) {
            res.status(500)
            res.json(e)
        }
    }

    async getById(req: express.Request, res: express.Response) {
        try {
            const product = await productModel.getProductById(
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
            if (!req.body.name) {
                return res.status(400).json({
                    error: 'Product name is required',
                })
            }
            const product = await productModel.createProduct({
                name: req.body.name as string,
                price: parseFloat(req.body.price as string),
                category: req.body.category as string,
            })
            res.status(201).json(product)
        } catch (e) {
            res.status(500).json(e)
        }
    }

    async update(req: express.Request, res: express.Response) {
        try {
            if (!req.body.name) {
                return res.status(400).json({
                    error: 'Please provide product name',
                })
            }
            const product = await productModel.updateProduct({
                id: parseInt(req.params.id as string),
                name: req.body.name as string,
                price: parseFloat(req.body.price as string),
                category: req.body.category as string,
            })
            res.status(201).json(product)
        } catch (e) {
            res.status(500).json(e)
        }
    }

    async delete(req: express.Request, res: express.Response) {
        try {
            await productModel.deleteProduct(parseInt(req.params.id as string))
            res.status(200).json({
                status: `Product ${req.params.id} has been deleted`,
            })
        } catch (e) {
            res.status(500).json(e)
        }
    }
}
