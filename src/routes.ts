import { Application, Router } from 'express'
import { ResizeImageController } from './controllers/resizemagecontroller'
const _routes: [string, Router][] = [['/api/', ResizeImageController]]

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const routes = (app: Application) => {
    _routes.forEach((route) => {
        const [url, controller] = route
        app.use(url, controller)
    })
}
