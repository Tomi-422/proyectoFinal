const { Router } = require('express')
const CartDb = require('../model/carts.model')
const FilesDao = require('../dao/files.dao');


const router = Router()
const cartFile = new FilesDao('products.json')


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

router.delete('/:cid/products/:pid', async (req,res) => {
    try {
    const {cid, pid} = req.params

    const cart = await Carts.findOne ({ _id: cid})
    const product = await Products.findOne ({ _id: pid})

    let i = 0;

    console.log(cart.products.length)
    if(cart.products.length > 0){
        while (i != -1){
            if(cart.products[i].product == pid){
            cart.products.splice(0,(i+1))
            i = -1 //Corto el while
            }else {
                i++
            }
        }
    await Carts.updateOne({_id: cid}, cart)
    res.json({ message: "Producto eliminado"})
    }else{
    res.json({ message: "El carrito esta vacio!"})
    }
    } catch (error) {
    
        console.log(error)
        res.status(400).json({message: "No se encontro el id del producto o carrito"})
    }
})

router.delete('/:cid', async (req,res) => {
    try {
    const {cid} = req.params

    const cart = await Carts.findOne ({ _id: cid})
    cart.products = []

    await Carts.updateOne({_id: cid}, cart)

    res.json({ message: "Se a vaciado el carrito!"})
    } catch (error) {
        console.log(error)
        res.status(400).json({status: 'error', error})
    }
})

router.delete('/', async (req,res) => {
    try {
        await CartDb.deleteMany()
        res.json({ message: 'productos eliminados' })       
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




module.exports = router