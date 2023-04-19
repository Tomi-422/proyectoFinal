const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const collectionName = 'product'

const collectionSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    thumbnail: String,
    code: Number,
    stock: Number,
    status: {
        type: Boolean,
        default: true,
    },
    category: String
})

collectionSchema.plugin(mongoosePaginate)

const ProductsDb = mongoose.model(collectionName, collectionSchema)

module.exports = ProductsDb 
