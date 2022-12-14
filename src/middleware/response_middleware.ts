import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

const page404Erro = (_req: Request, res: Response) => {
    res.status(404)
    res.send('Page Not Found')
}
export default page404Erro
export const authToken = (req: Request, res: Response, next: NextFunction) => {
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
