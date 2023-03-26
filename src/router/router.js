const cartsRouter = require('../routes/carts.js')
const productsRouter = require('../routes/products.js')
const realTimeRouter = require('../routes/realTimeProducts.js')

const router = app => {
    app.use('/api/products', productsRouter)
    app.use('/api/carts', cartsRouter)
    app.use('/api/realtimeproducts', realTimeRouter)
}


module.exports = router