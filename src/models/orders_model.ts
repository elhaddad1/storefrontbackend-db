import { Order_md } from './Interfaces/iorders'
import client from '../db'

export class OrdersModel {
    async getOrders(): Promise<Order_md[]> {
        try {
            const connection = await client.connect()
            const sql = 'SELECT * FROM orders_tb'

            const result = await connection.query(sql)
            connection.release()

            return result.rows
        } catch (err) {
            throw new Error(`Could not get orders. Error: ${err}`)
        }
    }

    async getOrderById(id: number): Promise<Order_md> {
        try {
            const sql = 'SELECT * FROM orders_tb WHERE id=($1)'

            const connection = await client.connect()

            const result = await connection.query(sql, [id])
            connection.release()

            return result.rows[0]
        } catch (err) {
            throw new Error(`Could not find product ${id}. Error: ${err}`)
        }
    }

    async createOrder(o: Order_md): Promise<Order_md> {
        try {
            const sql =
                'INSERT INTO orders_tb (user_id, status) VALUES($1, $2) RETURNING *'

            const connection = await client.connect()

            const result = await connection.query(sql, [o.user_id, o.status])
            connection.release()

            return result.rows[0]
        } catch (err) {
            throw new Error(`Could not add new order. Error: ${err}`)
        }
    }

    async updateOrder(o: Order_md): Promise<Order_md> {
        try {
            const sql = `UPDATE orders_tb SET user_id = $2, status = $3 WHERE id = $1 RETURNING *`

            const connection = await client.connect()

            const result = await connection.query(sql, [
                o.id,
                o.user_id,
                o.status,
            ])
            connection.release()

            return result.rows[0]
        } catch (err) {
            throw new Error(`Could not update order ${o.id}. Error: ${err}`)
        }
    }

    async deleteOrder(id: number): Promise<Order_md> {
        try {
            const conn = await client.connect()
            const sql = 'DELETE FROM orders_tb WHERE id=($1)'

            const result = await conn.query(sql, [id])
            conn.release()

            return result.rows[0]
        } catch (err) {
            throw new Error(`Could not delete order ${id}. Error: ${err}`)
        }
    }

    async getCurrentOrders(id: number) {
        try {
            const conn = await client.connect()
            const sql = `SELECT *
                         FROM orders_tb
                         WHERE user_id = ($1);`
            const result = await conn.query(sql, [id])
            conn.release()

            return result.rows
        } catch (err) {
            throw new Error(
                `Could not get orders for user ${id}. Error: ${err}`
            )
        }
    }
}
