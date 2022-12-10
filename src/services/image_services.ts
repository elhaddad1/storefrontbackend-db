import sharp from 'sharp'
import fs from 'fs'

export function resizeImage(
    imgPath: string,
    newPath: string,
    width: number | null,
    height: number | null
): Promise<string> {
    return new Promise((resolve) => {
        try {
            if (fs.existsSync(imgPath)) {
                //validate if image already processed before
                if (fs.existsSync(newPath)) {
                    return resolve(newPath)
                }
                const readStream: fs.ReadStream = fs.createReadStream(imgPath)
                const writeStream: fs.WriteStream =
                    fs.createWriteStream(newPath)
                let resizeSharp: sharp.Sharp = sharp()
                resizeSharp = resizeSharp
                    .resize(width, height)
                    .on('info', () => console.log('Image Resized..'))
                readStream.pipe(resizeSharp).pipe(writeStream)
                setTimeout(() => {
                    return resolve(newPath)
                }, 500)
            } else {
                return resolve('file not found')
            }
        } catch (error) {
            Promise.reject(typeof error === 'string' ? error : error)
            console.log(error)
        }
    })
}
