const mongoose = require('mongoose')


const collectionName = 'carts'

const collectionSchema = new mongoose.Schema({
    products: {
        type: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'products'
                },
                quantity: Number,
            }       
        ],
        default: []
    }
})

collectionSchema.plugin(mongoosePaginate)
collectionSchema.pre('find', function(){
    this.populate('products.product')
})

const CartDb = mongoose.model(collectionName, collectionSchema)

module.exports = CartDb

