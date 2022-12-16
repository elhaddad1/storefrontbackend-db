import { token } from 'morgan'
import { UsersModel } from '../../models/users_model'

const userModel = new UsersModel()

describe('User Model', () => {
    it('Test create new user', async () => {
        const result = await userModel.createUser({
            username: 'aelhadad',
            first_name: 'ahmed',
            last_name: 'elhadad',
            password: 'elhadad1',
        })
        console.log(result)
        expect(result.username).toEqual('aelhadad')
    })

    it('Test update old user', async () => {
        const result = await userModel.updateUser({
            id: 2,
            username: 'aelhadad1',
            first_name: 'ahmed',
            last_name: 'elhadad',
            password: 'elhadad1',
        })
        console.log(result)
        expect(result.username).toEqual('aelhadad1')
    })

    it('Test return all users', async () => {
        const result = await userModel.getUsers()
        console.log(result)
        expect(result).toEqual([
            {
                id: 2,
                username: 'aelhadad1',
                first_name: 'ahmed',
                last_name: 'elhadad',
                password_digest: 'elhadad1',
            },
        ])
    })

    it('Test return user by id', async () => {
        const result = await userModel.getUserById(2)
        console.log(result)
        expect(result.username).toEqual('aelhadad1')
    })

    it('Test delete specific user', async () => {
        await userModel.deleteUser(2)
        const result = await userModel.getUsers()

        expect(result).toEqual([])
    })
})
