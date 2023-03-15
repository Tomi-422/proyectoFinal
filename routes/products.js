const { Router } = require('express')
const { products } = require('../class/productMannager')

const router = Router()

router.get('/', async (req, res) => {
    const prod = await products.getProducts()

    const { limit = 0 } = req.query

    const queries = {
        limit
    }

    if (limit != 0) return res.send(prod.slice(0, queries.limit))

    return res.send({ prod })
})

router.post('/', async (req, res) => {
    const { newProduct } = req.body
    await products.addProduct(newProduct)
    res.json({ message: 'Product created' })
})

router.get('/:pid', async (req, res) => {
    const pid = req.params.pid
    const prodId = await products.getProductsById(pid)
    res.send({ prodId })
})

router.put('/:pid', async (req, res) => {
    const pid = req.params.pid
    const { prodUpdate } = req.body
    await products.updateProduct(pid, prodUpdate)
    res.json({ message: 'Product updated' })
})

router.delete('/:pid', async (req, res) => {
    const pid = req.params.pid
    await products.deleteProduct(pid)
    res.json({ message: 'Product deleted' })
})

module.exports = router