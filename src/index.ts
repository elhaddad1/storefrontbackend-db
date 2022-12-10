import express, { Application, Request, Response } from 'express'
import morgan from 'morgan'
import { routes } from './routes'
import { page404Erro } from './middleware/responsecases'
import path from 'path'

const PORT = process.env.PORT || 3000
// create an instance server
const app: Application = express()
// HTTP request logger middleware
app.use(morgan('dev'))
const pathList = __dirname.split(path.sep)
pathList.pop()
app.use('/images', express.static(path.join(pathList.join(path.sep), 'images')))
routes(app)
app.use(page404Erro)
// add routing for / path
app.get('/', (req: Request, res: Response) => {
    res.json({
        message: 'Hello World 🌍',
    })
})

// start express server
app.listen(PORT, () => {
    console.log(`Server is starting at prot:${PORT}`)
})
export default app
