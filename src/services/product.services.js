const faker = require('faker')

class ProductService {
    constructor() {
        this.products = []
        this.generate()
    }

    generate() {
        const size = 100
        for (let index = 0; index < size; index++) {
            this.products.push({
                id: faker.datatype.uuid(),
                name: faker.commerce.productName(),
                price: faker.commerce.price() - 0,
                image: faker.image.imageUrl()
            })
        }
    }
    
    create({ name, price, image }) {
        return new Promise((resolve, reject) => {
            if(!name || !price || !image) {
                reject(new Error('Missing data'))
            } else {
                const product = {
                    id: faker.datatype.uuid(),
                    name,
                    price,
                    image
                }
                this.products.push(product)
                resolve(product)
            }
        })
    }

    getAll() {
        return this.products
    }

    get(id) {
        return new Promise((resolve, reject) => {
            const index =  this.products.findIndex(product => product.id === id)
            if(index === -1) {
                reject(new Error('Product not found'))
            } else {
                resolve(this.products[index])
            }
        })
    }

    update(id, data) {
        const index = this.products.findIndex(product => product.id === id)
        return new Promise((resolve, reject) => {
            if(index === -1) {
                reject(new Error('Product not found'))
            } else {
                this.products[index] = {
                    id: this.products[index].id,
                    ...data
                }
                resolve(this.products[index])
            }
        })


    }

    updatePartial (id, data) {
        const index = this.products.findIndex(product => product.id === id)
        return new Promise((resolve, reject) => {
            if(index === -1) {
                reject(new Error('Product not found'))
            } else {
                this.products[index] = {
                    ...this.products[index],
                    ...data
                }
                resolve(this.products[index])
            }
        })
    }

    delete(id) {
        const index = this.products.findIndex(product => product.id === id)
        return new Promise((resolve, reject) => {
            if(index === -1) {
                reject(new Error('Product not found'))
            }
            const product = this.products.splice(index, 1)
            resolve(product)
        })

    }
}

module.exports = ProductService;
