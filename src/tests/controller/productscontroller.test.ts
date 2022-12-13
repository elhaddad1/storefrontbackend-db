import supertest from 'supertest'
import app from '../../index'
import { createJWTToken } from '../../utilities/authorisation'

const request = supertest(app)
const token: string = createJWTToken(1, 'bearer')

describe('Test Product controllers: ', () => {
    it('Test create new product', () => {
        const data = {
            name: 'Test',
            price: 40.0,
            category: 'category a',
        }
        request
            .post('/api/products/create')
            .set('Authorization', `Bearer ${token}`)
            .send(data)
            .expect('Content-Type', /json/)
            .expect(201)
            .expect({
                id: 1,
                name: 'Test',
                price: 40.0,
                category: 'category a',
            })
    })

    it('Test delete product by id', () => {
        request
            .delete('/api/products/1')
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
            .then(() => {
                request.get('/api/products').expect({})
            })
    })
})
