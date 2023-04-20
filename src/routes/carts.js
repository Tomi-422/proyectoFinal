const { Router } = require('express')
const { carts } = require('../class/productMannager')
const CartDb = require('../model/carts.model')

const router = Router()


router.get('/', async (req, res) => {
    try {
        const cart = await CartDb.find()
        res.json({ status: 'success', message: cart})
    } catch (error) {
        res.status(400).json({ status: 'error', error })
    }
})

router.post('/', async (req, res) => {
    try {
        const sinEstoNoFunciona = null
        const newCart = await CartDb.create(sinEstoNoFunciona)
        res.json({ status: 'success cart created', message: newCart})
    } catch (error) {
        res.status(400).json({ status: 'error', error })
    }
})


router.put('/:cartId', async (req, res) => {
    try {
       const { cartId } = req.params 
       const { product } = req.body
       const cart = await CartDb.findOne({ _id: cartId })
       cart.products.push({ product })
       const response = await CartDb.updateOne({ _id: cartId}, cart)
       res.json({ message: response })

    } catch (error) {
        res.status(400).json({ status: 'error', error })
    }
})


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
        await CartDb.deleteMany()
        res.json({ message: 'productos eliminados' })       
    } catch (error) {
        res.status(400).json({ status: 'error', error })
    }
     
})


module.exports = router