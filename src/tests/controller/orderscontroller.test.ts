import supertest from 'supertest'
import app from '../../index'
import { createJWTToken } from '../../utilities/authorisation'

const request = supertest(app)
const token: string = createJWTToken(1, 'bearer')

describe('Test Order controller: ', () => {
    it('Test Create New Order ', () => {
        const data = {
            user_id: 1,
            status: 'new order',
        }
        request
            .post('/api/orders/create')
            .set('Authorization', `Bearer ${token}`)
            .send(data)
            .expect('Content-Type', 'application/json')
            .expect(201)
            .expect({
                id: 1,
                user_id: 1,
                status: 'new order',
            })
    })

    it('Test delete order by id', async () => {
        await request
            .delete('/api/orders/1')
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
            .then(() => {
                request.get('/api/orders').expect({})
            })
    })
})
