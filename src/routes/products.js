const { Router } = require('express')
const ProductsDb  = require('../model/products.model')
const FilesDao = require('../dao/files.dao')

const router = Router()
const productsFile = new FilesDao('products.json')

router.get('/', async (req, res) => {

    const { limit = 10, page = 1, filtro} = req.query

    let queries = {
        limit,
        page,
        filtro
    }

    page = queries.page
    limit = queries.limit
    filtro = queries.filtro

    try {

        if(!filtro) {
            let result = await ProductsDb.paginate({},{page,limit,lean:true,})
            result.status = "success"
            result.prevLink = result.hasPrevPage?`http://localhost:3000/api/products?limit=${limit}&page=${result.prevPage}`:'';
            result.nextLink = result.hasNextPage?`http://localhost:3000/api/products?limit=${limit}&page=${result.nextPage}`:'';
            result.isValid = !(page <= 0 || page > result.totalPages)
            res.render('products', result)
        } else {
            let result = await ProductsDb.paginate({category: `${filtro}`}, {page,limit,lean:true,})
            result.status = "success" 
            result.prevLink = result.hasPrevPage?`http://localhost:3000/api/products?limit=${limit}&filtro=${filtro}&page=${result.prevPage}`:'';
            result.nextLink = result.hasNextPage?`http://localhost:3000/api/products?limit=${limit}&filtro=${filtro}&page=${result.nextPage}`:'';
            result.isValid = !(page <= 0 || page > result.totalPages)
            result.render('products', result)
        }
        // const products = await ProductsDb.find({ status: true })

        // return res.json({ message: products })
    } catch (error) {
        console.log(error)
        res.status(400).json({status: 'error', error})
    }
})

router.get('/loadData', async (req,res) => {
    try {
        const products = await productsFile.getItems()
        const newProducts = await ProductsDb.insertMany(products)
        res.json({ status: 'success', mensage: newProducts })
    } catch (error) {
        console.log(error)
        res.status(400).json({status: 'error', error})
    }
})

router.get('/:pid', async (req, res) => {

    try {
        const { id } = req.params.pid

        const productsById = await ProductsDb.find({ _id: id })

        res.json({ message: productsById })

    } catch (error) {
        console.log(error)
        res.status(400).json({status: 'error', error})
    }
})

router.post('/', async (req, res) => {

    try {
        const { title, description, price, thumbnail, code, stock, status, category, quantity = 1} = req.body
    
        const newProductInfo = {
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
            status,
            category,
            quantity
        } 

        if(!title||!description||!price||!thumbnail||!code||!stock||!status||!category||!quantity) return res.json({ message: 'campos incompletos'})

        const newProduct = await ProductsDb.create(newProductInfo)

        res.json({status:'success', message: newProduct })
        
    } catch (error) {
        console.log(error)
        res.status(400).json({status: 'error', error})
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
        res.status(400).json({status: 'error', error})
    }
})

router.delete('/:pid', async (req, res) => {

    try {
        const { id } = req.params.pid
        const updateProduct = await ProductsDb.updateOne({ _id: id }, { status: false })
        res.json({ message: 'Product deleted', updateProduct })
    } catch (error) {
        console.log(error)
        res.status(400).json({status: 'error', error})
    }
})

module.exports = router