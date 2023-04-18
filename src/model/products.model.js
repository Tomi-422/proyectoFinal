const mongoose = require('mongoose')

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

const ProductsDb = mongoose.model(collectionName, collectionSchema)

module.exports = ProductsDb 
