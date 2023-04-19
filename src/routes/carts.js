const { Router } = require('express')
const { carts } = require('../class/productMannager')
const CartDb = require('../model/carts.model')

const router = Router()

// router.post('/', async (req, res) => {
//     const { newCart } = req.body
//     await carts.addCart(newCart)
//     res.json({ message: 'Cart created' })
// })

// router.get('/:cid', async (req, res) => {
//     const cid = req.params.cid
//     const cartId = await carts.getCartById(cid)
//     res.send({ cartId })
// })

// router.post('/:cid/product/:pid', async (req, res) => {
//     const cid = req.params.cid
//     const pid = req.params.pid

//     const cart = await carts.getCartById(cid)
//     const productIndex = cart.products.findIndex((p) => p.products === pid)

//     if (productIndex !== -1) {
//         cart.products[productIndex].quantity += 1
//         await carts.updateCart(cart)
//         res.json(cart)
//     } else {
//         const newProduct = {product: pid, quantity: 1 }
//         cart.products.push(newProduct)
//         await carts.updateCart(cart)
//         res.json(cart)
//     }
// })

router.delete('/', async (req,res) => {
    try {
        CartDb.deleteMany()
        res.json({ message: 'productos eliminados' })       
    } catch (error) {
        console.log(error)
    }
    
})


module.exports = router