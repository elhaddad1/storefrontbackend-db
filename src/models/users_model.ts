import { UserAut_md, User_md } from './Interfaces/iusers'
import jwt from 'jsonwebtoken'
import { NextFunction, Request, Response } from 'express'
import client from '../db'

export class UsersModel {
    async getUsers(): Promise<User_md[]> {
        try {
            const connection = await client.connect()
            const sql = 'SELECT * FROM users_tb'
            const result = await connection.query(sql)
            connection.release()

            return result.rows
        } catch (err) {
            throw new Error(`Could not get users. Error: ${err}`)
        }
    }

    async getUserById(id: number): Promise<User_md> {
        try {
            const sql = 'SELECT * FROM users_tb WHERE id=($1)'
            const connection = await client.connect()
            const result = await connection.query(sql, [id])
            connection.release()

            return result.rows[0]
        } catch (err) {
            throw new Error(`Could not find user ${id}. Error: ${err}`)
        }
    }

    async createUser(u: User_md): Promise<UserAut_md> {
        try {
            const connection = await client.connect()
            const sql =
                'INSERT INTO users_tb (username, firstname, lastname, password_digest) VALUES($1, $2, $3, $4) RETURNING *'

            const result = await connection.query(sql, [
                u.username,
                u.firstname,
                u.lastname,
                u.password,
            ])
            connection.release()

            return result.rows[0]
        } catch (err) {
            throw new Error(
                `Could not add new user ${u.firstname}. Error: ${err}`
            )
        }
    }

    async updateUser(u: User_md): Promise<User_md> {
        try {
            const connection = await client.connect()
            const sql = `UPDATE users_tb SET username = $2, firstname = $3, lastname = $4, password_digest = $5 WHERE id = $1 RETURNING *`

            const result = await connection.query(sql, [
                u.id,
                u.username,
                u.firstname,
                u.lastname,
                u.password,
            ])
            connection.release()

            return result.rows[0]
        } catch (err) {
            throw new Error(`Could not update user ${u.id}. Error: ${err}`)
        }
    }

    async deleteUser(id: number): Promise<User_md> {
        try {
            const connection = await client.connect()
            const sql = 'DELETE FROM users_tb WHERE id=($1)'
            const result = await connection.query(sql, [id])
            connection.release()

            return result.rows[0]
        } catch (err) {
            throw new Error(`Could not delete user ${id}. Error: ${err}`)
        }
    }

    async authToken(req: Request, res: Response, next: NextFunction) {
        try {
            const authorizationHeader: string | undefined =
                req.headers.authorization
            const token: string = authorizationHeader
                ? authorizationHeader.split(' ')[1]
                : ''

            res.locals.userData = jwt.verify(
                token,
                process.env.TOKEN_SECRET as string
            )
            next()
        } catch (err) {
            // @ts-ignore
            err.code = 401
            next(err)
        }
    }
}
