import supertest from 'supertest'
import app from '../../index'
import { createJWTToken } from '../../utilities/authorisation'

const request = supertest(app)
const token: string = createJWTToken(1, 'bearer')

describe('Test Users controller: ', () => {
    it('Test create new user', () => {
        const data = {
            username: 'aelhadad',
            first_name: 'ahmed',
            last_name: 'elhadad',
            password: 'elhadad1',
        }
        request
            .post('/api/users/create')
            .send(data)
            .expect('Content-Type', 'application/json')
            .expect(201)
            .expect({
                id: 1,
                username: 'aelhadad',
                first_name: 'ahmed',
                last_name: 'elhadad',
            })
    })

    it('Test delete users by id', async () => {
        await request
            .delete('/api/users/1')
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
            .then(() => {
                request.get('/api/users').expect({})
            })
    })
})
