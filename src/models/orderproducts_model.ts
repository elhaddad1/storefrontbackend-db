import { OrderProduct_md } from './Interfaces/iorderproducts'
import client from '../db'

export class OrderProductsModel {
    async getByOrderId(id: number): Promise<OrderProduct_md[]> {
        try {
            const sql = 'SELECT * FROM order_products_tb WHERE order_id=($1)'

            const connection = await client.connect()

            const result = await connection.query(sql, [id])
            connection.release()

            return result.rows[0]
        } catch (err) {
            throw new Error(`Could not find product order ${id}. Error: ${err}`)
        }
    }

    async addProductToOrder(p: OrderProduct_md): Promise<OrderProduct_md> {
        try {
            const sql =
                'INSERT INTO order_products_tb (order_id, product_id, quantity) VALUES($1, $2, $3) RETURNING *'

            const connection = await client.connect()

            const result = await connection.query(sql, [
                p.order_id,
                p.product_id,
                p.quantity,
            ])
            connection.release()

            return result.rows[0]
        } catch (err) {
            throw new Error(`Could not add product. Error: ${err}`)
        }
    }

    async deleteByOrderId(id: number): Promise<OrderProduct_md> {
        try {
            const conn = await client.connect()
            const sql = 'DELETE FROM order_products_tb WHERE order_id=($1)'

            const result = await conn.query(sql, [id])
            conn.release()

            return result.rows[0]
        } catch (err) {
            throw new Error(`Could not delete order ${id}. Error: ${err}`)
        }
    }

    async deleteById(id: number): Promise<OrderProduct_md> {
        try {
            // @ts-ignore
            const conn = await client.connect()
            const sql = 'DELETE FROM order_products_tb WHERE id=($1)'

            const result = await conn.query(sql, [id])
            conn.release()

            return result.rows[0]
        } catch (err) {
            throw new Error(`Could not delete order ${id}. Error: ${err}`)
        }
    }
}
