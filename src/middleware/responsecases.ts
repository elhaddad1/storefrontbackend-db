import { Request, Response } from 'express'

export const page404Erro = (_req: Request, res: Response) => {
    res.status(404)
    res.send('Page Not Found')
}
