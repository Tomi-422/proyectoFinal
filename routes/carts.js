const { Router } = require('express')
const { carts } = require('../class/productMannager')

const router = Router()

router.post('/', async (req, res) => {
    const { newCart } = req.body
    await carts.addProduct(newCart)
    res.json({ message: 'Cart created' })
})

router.get('/:cid', async (req, res) => {
    const cid = req.params.cid
    const cartId = await carts.getProductsById(cid)
    res.send({ cartId })
})

router.post('/:cid/product/:pid', async (req, res) => {
    const cid = req.params.cid
    const pid = req.params.pid
})


module.exports = router