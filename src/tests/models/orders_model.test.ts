import { OrdersModel } from '../../models/orders_model'
import { ProductsModel } from '../../models/products_model'
import { UsersModel } from '../../models/users_model'

const orderModel = new OrdersModel()

const userModel = new UsersModel()
let productId: number, userId: number
describe('Order Model', () => {
    beforeAll(async () => {
        const user = await userModel.createUser({
            username: 'aelhadad',
            first_name: 'ahmed',
            last_name: 'elhadad',
            password: 'elhadad1',
        })
        userId = user.id as number
    })

    afterAll(async () => {
        await userModel.deleteUser(userId)
    })

    it('Test create new order', async () => {
        const result = await orderModel.createOrder({
            user_id: userId,
            status: 'new order',
        })
        expect(result).toEqual({
            id: 1,
            user_id: userId,
            status: 'new order',
        })
    })

    it('Test update old order', async () => {
        const result = await orderModel.updateOrder({
            id: 1,
            user_id: userId,
            status: 'new order 1',
        })
        console.log(result)
        expect(result).toEqual({
            id: 1,
            user_id: userId,
            status: 'new order 1',
        })
    })

    it('Test return all orders', async () => {
        const result = await orderModel.getOrders()
        console.log(result)
        expect(result).toEqual([
            {
                id: 1,
                user_id: userId,
                status: 'new order 1',
            },
        ])
    })

    it('Test return order by id', async () => {
        const result = await orderModel.getOrderById(1)
        console.log(result)
        expect(result).toEqual({
            id: 1,
            user_id: userId,
            status: 'new order 1',
        })
    })

    it('Test delete specific order', async () => {
        await orderModel.deleteOrder(1)
        const result = await orderModel.getOrders()

        expect(result).toEqual([])
    })
})
