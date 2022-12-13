import { Router, Request, Response } from 'express'
import * as imgService from '../services/image_services'
import { imagePaths, imagesPath, newImageName } from '../utilities/core'
import { validateparametars } from '../utilities/core_validation'
export const ResizeImageController: Router = Router()

ResizeImageController.get(
    '/resizeimage',
    async (req: Request, res: Response) => {
        try {
            const { fullImagePath, resizedImagePath }: imagePaths = imagesPath()
            const _validationMessage = validateparametars(
                req.query.filename,
                req.query.width,
                req.query.height
            )
            if (_validationMessage) {
                res.status(400)
                res.json({
                    message: _validationMessage,
                })
                return
            }

            const width: number = parseInt(
                (req.query.width as string).replace(/\D/g, ''),
                10
            )
            const height: number = parseInt(
                (req.query.height as string).replace(/\D/g, ''),
                10
            )
            const imgPath = fullImagePath + (req.query.filename as string)
            const newPath =
                resizedImagePath +
                newImageName(req.query.filename as string, width, height)
            const result = await imgService.resizeImage(
                imgPath,
                newPath,
                width,
                height
            )
            if (result === 'file not found') {
                res.status(404)
                res.json({
                    message: 'file not found',
                })
                return
            }
            res.status(200)
            res.sendFile(newPath)
        } catch (error) {
            Promise.reject(typeof error === 'string' ? error : error)
            console.log(error)
            res.status(404)
            res.json({
                message: error,
            })
            return
        }
    }
)
