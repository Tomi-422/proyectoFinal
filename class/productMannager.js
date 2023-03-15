const fs = require('fs')

class ProductMannager {
    static id = 1
    
    constructor (path) {
        this.products = []
        this.path = path 
    }

    addProduct (title, description, code, price, thumbnail, stock, status=true, category) {
        // const {} = product
        
        const productInfo = {
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
            status,
            category,
            id: ProductMannager.id
        }

        const addToproducts = async () => {
            const data =fs.readFileSync(this.path, 'utf-8')
            const prod = JSON.parse(data)
            this.products.push(prod)
            await addToproducts()
        }

        this.products.push(productInfo)
        ProductMannager.id ++

        fs.writeFileSync(this.path, JSON.stringify(this.products))
    }

    getProducts =  () => {
        const data = fs.readFileSync(this.path, 'utf-8')
        const prod = JSON.parse(data)
        return prod
    }

    getProductsById(id) {
        let data = fs.readFileSync(this.path,'utf-8')

        data = JSON.parse(data)

        const busqueda = data.find(e => e.id == id)
        if(busqueda != undefined){
            console.log('Producto encontrado', busqueda)
            return busqueda 
        } else {return console.log("Product not found")}
    }

    updateProduct = async (id, prodUpdate) => {
    
        let data = await fs.promises.readFile(this.path,'utf-8')
        
        data = await JSON.parse(data)
        let index = await data.findIndex((e) => e.id === id)

        if(index !== -1){ data[index] = Object.assign({}, data[index], prodUpdate, { id })
            fs.writeFileSync(this.path, JSON.stringify(data))
            console.log('Producto modificado con exito')
        } else console.log('error')
    }

    deleteProduct = async (id) => {
        try {
        let data = await fs.promises.readFile(this.path,'utf-8')
        
            data = await JSON.parse(data)
            let busqueda = await data.filter(e => e.id != id)
            let res = await data.some(e => e.id == id)


            if (res == false)
            {
                error();
            }else if (busqueda != undefined) {
                await fs.promises.writeFile(this.path, JSON.stringify(busqueda))
                data = await fs.promises.readFile(this.path,'utf-8')
                .then(data => {
                    console.log("Se a eliminido el producto")
                    })
                }
        } catch(error) {
                await console.log("El producto no existe")
            }
    }

    addCart()

}

const products = new ProductMannager('./files/products.json')  

const carts = new ProductMannager('./files/carts.json')

module.exports = {products, carts}


