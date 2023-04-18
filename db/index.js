const mongoose = require ('mongoose')

const dbConnect = async () => {
    try{
        await mongoose.connect(
            'mongodb+srv://admin:admin@cluster0.9qfhzok.mongodb.net/?retryWrites=true&w=majority'
        )
        console.log('db is connected')
    } catch (error) {
        console.log(error)
    }
}

module.exports = dbConnect