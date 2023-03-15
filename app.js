const express = require('express')
const cartsRouter = require('./routes/carts.js')
const productsRouter = require('./routes/products.js')

const app = express()
const port = 8080

app.use(express.urlencoded({ extended:true })) 
app.use(express.json())

app.use('/api/products', productsRouter)

app.use('/api/carts', cartsRouter)

app.listen(port, () => {
    console.log(`server running at port ${port}`)
})