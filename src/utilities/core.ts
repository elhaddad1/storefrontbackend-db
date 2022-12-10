import path from 'path'

export interface imagePaths {
    fullImagePath: string
    resizedImagePath: string
}
export const imagesPath = (): imagePaths => {
    return {
        fullImagePath: path.join(__dirname, '../../images/full/'),
        resizedImagePath: path.join(__dirname, '../../images/resized_images/'),
    }
}

export const newImageName = (
    file: string,
    width: number,
    height: number
): string => {
    return width + 'W_' + height + 'H_' + file
}
