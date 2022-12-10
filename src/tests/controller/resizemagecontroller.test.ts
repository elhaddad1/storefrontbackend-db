import request from 'supertest'
import app from '../../index'

describe('Test resize controller', () => {
    it("Request '/api/resizeimage' should return staus 200", async () => {
        try {
            const result = await request(app)
                .get(
                    '/api/resizeimage?filename=encenadaport.jpg&width=200&height=500'
                )
                .send()

            expect(result.status).toBe(200)
        } catch (error) {
            Promise.reject(typeof error === 'string' ? error : error)
            console.log('That did not go well.')
        }
    })
})
