const { Router } = require('express')
const ProductsDb  = require('../model/products.model')

const router = Router()

router.get('/', async (req, res) => {

    try {
        const products = await ProductsDb.find({ status: true })

        return res.json({ message: products })

    } catch (error) {
        console.log(error)
    }


    // //////////////////////////////////////

    // const { limit = 10, page = 1,  query, sort } = req.query

    // const queries = {
    //     limit,
    //     page,
    //     query,
    //     sort
    // }

    // if (limit != 0) return res.send(prod.slice(0, queries.limit))

    // return res.send({ prod })

    // //logica del page, query y sort 

    // /////////////////////////////////////

})

router.get('/:pid', async (req, res) => {

    try {
        const { id } = req.params.pid

        const productsById = await ProductsDb.find({ _id: id })

        res.json({ message: productsById })

    } catch (error) {
        console.log(error)
    }
})

router.post('/', async (req, res) => {

    try {
        const { title, description, price, thumbnail, code, stock, status, category } = req.body
    
        const newProductInfo = {
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
            status,
            category,
        } 

        if(!title||!description||!price||!thumbnail||!code||!stock||!status||!category) return res.json({ message: 'campos incompletos'})

        const newProduct = await ProductsDb.create(newProductInfo)

        res.json({ message: newProduct })
        
    } catch (error) {
        console.log(error)
    }
})

router.put('/:pid', async (req, res) => {

    try {
        const { id } = req.params
        const { title, description, price, thumbnail, code, stock, status, category} = req.body

        const updateProductInfo = {
            title,
            description,
            price,
            thumbnail,
            code, 
            stock,
            status,
            category
        }

        if(!title||!description||!price||!thumbnail||!code||!stock||!status||!category) return res.json({ message: 'campos incompletos'})

        const updateProduct = await ProductsDb.updateOne({ _id: id }, updateProductInfo)

        res.json({ message: 'Product updated', updateProduct })
        
    } catch (error) {
        console.log(error)
    }
})

router.delete('/:pid', async (req, res) => {

    try {
        const { id } = req.params.pid
        const updateProduct = await ProductsDb.updateOne({ _id: id }, { status: false })
        res.json({ message: 'Product deleted', updateProduct })
    } catch (error) {
        console.log(error)
    }
})

module.exports = router