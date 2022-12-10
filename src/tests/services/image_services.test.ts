import path from 'path'
import { resizeImage } from '../../services/image_services'
import { imagePaths, imagesPath, newImageName } from '../../utilities/core'

describe('Function resizeImage', function () {
    it('is defined', function () {
        expect(resizeImage).not.toBeUndefined()
    })

    it('Pass test case', async () => {
        try {
            const { fullImagePath, resizedImagePath }: imagePaths = imagesPath()
            const imgPath = (fullImagePath+ 'encenadaport.jpg')
            const newPath = path.join(
                resizedImagePath+
                newImageName('encenadaport.jpg', 300, 300)
            )
            const result = await resizeImage(imgPath, newPath, 300, 300)
            expect(result).toEqual(newPath)
        } catch (error) {
            Promise.reject(typeof error === 'string' ? error : error)
            console.log('That did not go well.')
        }
    })

    it('file not exist', async () => {
        try {
            const result = await resizeImage(
                'images\\full\\wrongpath.jpg',
                '\\images\\resized_images\\new_encenadaport.jpg',
                200,
                300
            )

            expect(result).toEqual('file not found')
        } catch (error) {
            Promise.reject(typeof error === 'string' ? error : error)
            console.log('That did not go well.')
        }
    })
})
