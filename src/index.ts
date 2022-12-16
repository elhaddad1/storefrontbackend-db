import express, { Application } from 'express'
import cors from 'cors'
import apiRouter from './routes/routes'

const PORT = process.env.PORT || 3000
// create an instance server
const app: Application = express()
const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200,
}

app.use(cors(corsOptions))

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api', apiRouter)

app.get('/', (_req: express.Request, res: express.Response) => {
    res.redirect('/api')
})

app.listen(PORT, () => {
    // eslint-disable-next-line no-undef
    console.log(`server started at localhost: ${PORT}`)
})
export default app
