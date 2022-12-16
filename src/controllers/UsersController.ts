import express from 'express'
import { UserAut_md } from '../models/Interfaces/iusers'
import { UsersModel } from '../models/users_model'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const usersModel: UsersModel = new UsersModel()
const pepper: string = process.env.BCRYPT_PASSWORD as string
const saltRounds: number = parseInt(process.env.SALT_ROUNDS as string)

export default class UsersController {
    async getUsers(_req: express.Request, res: express.Response) {
        try {
            const users = await usersModel.getUsers()
            res.status(200).json(users)
        } catch (e) {
            res.status(400).json(e)
        }
    }

    async getUserById(req: express.Request, res: express.Response) {
        try {
            const user = await usersModel.getUserById(parseInt(req.params.id))

            if (user) {
                res.status(200).json(user)
            } else {
                res.status(404).json('user not found')
            }
        } catch (e) {
            res.status(400).json({ e: e as string })
        }
    }

    async create(req: express.Request, res: express.Response) {
        try {
            if (!(req.body.username || !req.body.password)) {
                return res.status(400).json({
                    error: 'Please provide username and password',
                })
            }

            const hashedPassword = bcrypt.hashSync(
                req.body.password + pepper,
                saltRounds
            )

            const user: UserAut_md = await usersModel.createUser({
                username: req.body.username as string,
                first_name: req.body.first_name as string,
                last_name: req.body.last_name as string,
                password: hashedPassword,
            })

            user.token = jwt.sign(
                { id: user.id, username: user.username },
                process.env.TOKEN_SECRET as string
            )
            res.status(201).json(user)
        } catch (e) {
            return res.status(400).json(e)
        }
    }

    async update(req: express.Request, res: express.Response) {
        try {
            if (!req.body.username || !req.body.password) {
                return res.status(400).json({
                    error: 'Missing required parameters',
                })
            }
            const user = await usersModel.updateUser({
                id: parseInt(req.params.id as string),
                username: req.body.username as string,
                first_name: req.body.first_name as string,
                last_name: req.body.last_name as string,
                password: req.body.password as string,
            })
            res.status(201).json(user)
        } catch (e) {
            res.status(400).json(e)
        }
    }

    async delete(req: express.Request, res: express.Response) {
        try {
            await usersModel.deleteUser(parseInt(req.params.id as string))
            res.status(200).json({
                status: `user ${req.params.id} has been deleted`,
            })
        } catch (e) {
            res.status(500).json(e)
        }
    }
}
