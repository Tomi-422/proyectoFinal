const express = require('express')
const router = require('./router/router')
const handlebars = require('express-handlebars')
const { Server } = require('socket.io')
const { products } = require('./class/productMannager')
 
const port = 8080
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended:true })) 
app.use(express.static(__dirname + '/public')) 
 
app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')


router(app)

const httpServer = app.listen(port, () => {
    console.log(`server running at port ${port}`)
})

const io = new Server(httpServer)

io.on('connection', async (socket) => {
    const productsCatched = await products.getProducts(); 
    io.emit("realtimeproducts", { productsCatched })
})