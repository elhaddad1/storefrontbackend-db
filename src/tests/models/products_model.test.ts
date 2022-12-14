import { ProductsModel } from '../../models/products_model'

const productModel = new ProductsModel()

describe('Product Model', () => {
    it('Test create new product', async () => {
        const result = await productModel.createProduct({
            name: 'Test product',
            price: '40.25',
            category: 'Test category',
        })
        console.log(result)
        expect(result).toEqual({
            id: 1,
            name: 'Test product',
            price: '40.25',
            category: 'Test category',
        })
    })

    it('Test update old product', async () => {
        const result = await productModel.updateProduct({
            id: 1,
            name: 'Test product 2',
            price: '50.25',
            category: 'New category',
        })
        console.log(result)
        expect(result).toEqual({
            id: 1,
            name: 'Test product 2',
            price: '50.25',
            category: 'New category',
        })
    })

    it('Test return all products', async () => {
        const result = await productModel.getProducts()
        console.log(result)
        expect(result).toEqual([
            {
                id: 1,
                name: 'Test product 2',
                price: '50.25',
                category: 'New category',
            },
        ])
    })

    it('Test return product by id', async () => {
        const result = await productModel.getProductById(1)
        console.log(result)
        expect(result).toEqual({
            id: 1,
            name: 'Test product 2',
            price: '50.25',
            category: 'New category',
        })
    })

    it('Test delete specific product', async () => {
        await productModel.deleteProduct(1)
        const result = await productModel.getProducts()

        expect(result).toEqual([])
    })
})
