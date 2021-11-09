const faker = require('faker')
const boom = require('@hapi/boom')
const sequelize = require('../libs/sequelize')

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
                image: faker.image.imageUrl(),
                isBlocked: faker.datatype.boolean()
            })
        }
    }
    
    create({ name, price, image }) {
        return new Promise((resolve, reject) => {
            if(!name || !price || !image) {
                reject(boom.badRequest('Missing data'))
            } else {
                const product = {
                    id: faker.datatype.uuid(),
                    name,
                    price,
                    image,
                    isBlocked: faker.datatype.boolean()
                }
                this.products.push(product)
                resolve(product)
            }
        })
    }

    async getAll() {
        const query = 'SELECT * FROM tasks'
        const [ data, metadata ] = await sequelize.query(query)
        return {
            data,
            metadata
        }
    }

    get(id) {
        return new Promise((resolve, reject) => {
            const index =  this.products.findIndex(product => product.id === id)
            if(index === -1) {
                reject(boom.notFound('Product not found'))
            } else if (this.products[index].isBlocked) {
                reject(boom.conflict('Producto bloqueado'))
            } else {
                resolve(this.products[index])
            }
        })
    }

    update(id, data) {
        const index = this.products.findIndex(product => product.id === id)
        return new Promise((resolve, reject) => {
            if(index === -1) {
                reject(boom.notFound('Product not found'))
            } else if(this.products[index].isBlocked) {
                reject(boom.conflict('Producto bloqueado'))
            }
            else {
                this.products[index] = {
                    id: this.products[index].id,
                    isBlocked: this.products[index].isBlocked,
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
            } else if (this.products[index].isBlocked) {
                reject(boom.conflict('Producto bloqueado'))
            }
            else {
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
                reject(boom.notFound('Product not found'))
            } else if(this.products[index].isBlocked) {
                reject(boom.conflict('No puedes borrar esto'))
            }
            const product = this.products.splice(index, 1)
            resolve(product)
        })

    }
}

module.exports = ProductService;
