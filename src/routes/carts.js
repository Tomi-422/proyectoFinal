const { Router } = require('express')
const CartDb = require('../model/carts.model')
const ProductsDb = require('../model/products.model')
const FilesDao = require('../dao/files.dao');


const router = Router()
const cartFile = new FilesDao('products.json')


router.get('/', async (req, res) => {
    try {
        const cart = await CartDb.find().populate("products.product")
        res.json({ status: 'success', message: cart})
    } catch (error) {
        res.status(400).json({ status: 'error', error })
    }
})

router.post('/', async (req, res) => {
    try {
        const sinEstoNoFunciona = null
        const newCart = await CartDb.create(sinEstoNoFunciona)
        res.status(201).json({ message: 'success cart created'})
    } catch (error) {
        res.status(400).json({ status: 'error', error })
    }
})


router.put('/:cid/products/:pid', async (req, res) => {
    try {
       const { cid, pid } = req.params 
       const { quantity } = req.body
       let encontro = 0
       let i = 0 
       
       let cart = await CartDb.findOne({_id: cid}).populate("products.product")
       let product = await ProductsDb.findOne({ _id: pid})

       if(cart.products.length > 0) {
        for(i = 0; i < cart.products.length; i++){
            if(cart.products[i].product._id == pid){
                cart.products[i].product.quantity++
                encontro = 1
                cantidad = cart.products[i].product.quantity
                if(cart.products[i].quantity == undefined || cart.products[i].quantity == null ){
                    cart.products[i].quantity = 1
                } else {
                    cart.products[i].quantity ++
                }
                let response2 = await CartDb.updateOne({_id: cid}, cart)
                res.json({ message: response2}) 
            }
        }
        if(encontro == 0) {
            console.log('no se encontro')
            cart.products.push({product})
            let response = await CartDb.updateOne({_id: cid}, cart)
            res.json({ message: response})
        } 

       } else {
        console.log('carrito vacio')
        cart.products.push({product})
        let response = await CartDb.updateOne({_id: cid}, cart)
        res.json({message: response})
       }

    } catch (error) {
        res.status(400).json({ status: 'error', error })
        console.log(error)
    }
})

router.delete('/:cid/products/:pid', async (req,res) => {
    try {
    const {cid, pid} = req.params

    const cart = await CartDb.findOne ({ _id: cid})
    const product = await ProductsDb.findOne ({ _id: pid})

    let i = 0;

    console.log(cart.products.length)
    if(cart.products.length > 0){
        while (i != -1){
            if(cart.products[i].product == pid){
            cart.products.splice(0,(i+1))
            i = -1 
            }else {
                i++
            }
        }
    await CartDb.updateOne({_id: cid}, cart)
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

    const cart = await CartDb.findOne ({ _id: cid})
    cart.products = []

    await CartDb.updateOne({_id: cid}, cart)

    res.json({ message: "Se a vaciado el carrito!"})
    } catch (error) {
        console.log(error)
        res.status(400).json({status: 'error', error})
    }
})


module.exports = router