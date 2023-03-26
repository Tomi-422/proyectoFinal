const fs = require('fs')

class ProductMannager {
    static id = 1
    
    constructor (path) {
        this.products = []
        this.path = path 
    }

    addToproducts = async () => {
        const data = await fs.promises.readFile(this.path, 'utf-8')
        const prod = JSON.parse(data)
        this.products.push(prod)
        await addToproducts()
    }

    async addProduct (product) {
        
        const {
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
            status = true,
            category
        } = product


        const productInfo = {
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
            status,
            category
        }

        await this.addToproducts();

        ProductMannager.id = this.products.length + 1;

        productInfo.id = ProductMannager.id;

        this.products.push(productInfo)
        fs.writeFileSync(this.path, JSON.stringify(this.products))
    }

    getProducts = async () => {
        const data = await fs.promises.readFile(this.path, 'utf-8')
        const prod = JSON.parse(data)
        return prod
    }

    async getProductsById(id) {
        let data = await fs.promises.readFile(this.path,'utf-8')

        data = JSON.parse(data)

        const busqueda = data.find(e => e.id == id)

        try {
            if(busqueda != undefined){
                console.log('Producto encontrado', busqueda)
                return busqueda 
            } 
        } catch (err) {
            return `Product not found`
        }
    }

    updateProduct = async (id, prodUpdate) => {
    
        let data = await fs.promises.readFile(this.path,'utf-8')
        
        data = await JSON.parse(data)
        let index = await data.findIndex((e) => e.id === id)


        try {
            if(index !== -1){ data[index] = Object.assign({}, data[index], prodUpdate, { id })
                fs.writeFileSync(this.path, JSON.stringify(data))
                console.log('Producto modificado con exito')
            } 
        } catch (err) {
            await console.log("El producto no se pudo modificar")
        }
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
        } catch(err) {
                await console.log("El producto no existe")
            }
    }

    async getDataCarrito() {
        const data = fs.readFileSync(this.path, 'utf-8')
        const carrito = JSON.parse(data)
        return carrito
    }

    async getCartById() {
        let cartData = await fs.promises.readFile(this.path,'utf-8')

        cartData = JSON.parse(cartData)

        const busqueda = cartData.find(e => e.id == id)
        try{
            if(busqueda != undefined){
                console.log('carrito encontrado', busqueda)
                return busqueda 
            }
        } catch (err) {
            console.log("cart not found")
        }
    }

    async addCart(cart) {
        const data = await this.getData();
        let newId = data.length == 0 ? 1 : data[data.length - 1].id + 1;
        const newCart = { ...cart, id: newId};
        data.push(newCart)

        try{
            await fs.promises.writeFile(this.path, JSON.stringify(data))
            return newId
        } catch (err) {
            return `No se pudo agregar al carrito ${cart}`
        }
    }

    async updateCart(cart) {
        const data = await this.getData()
        const index = data.findIndex((c) => c.id === cart.id)

        if(index === -1) {
            return `No se pudo actualizar el cart`
        }

        data.splice(index, 1, cart)

        try{
            await fs.promises.writeFile(this.path, JSON.stringify(data))
            return `el cart fue actualizado`
        } catch (err) {
            return `no se actualizo el cart`
        }
    } 
}

const products = new ProductMannager('./files/products.json')  

const carts = new ProductMannager('./files/carts.json')

module.exports = {products, carts}


