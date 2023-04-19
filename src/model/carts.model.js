const mongoose = require('mongoose')


const collectionName = 'carts'

const collectionSchema = new mongoose.Schema({
    products: {
        type: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'product'
                }
            }
        ],
        default: []
    }
})

const CartDb = mongoose.model(collectionName, collectionSchema)

module.exports = CartDb

