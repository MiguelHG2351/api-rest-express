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
        const product = {
            id: faker.datatype.uuid(),
            name,
            price,
            image
        }

        this.products.push(product)
        return product
    }

    getAll() {
        return this.products
    }

    get(id) {
        return this.products.find(product => product.id === id)
    }

    update(id, data) {
        const index = this.products.findIndex(product => product.id === id)

        this.products[index] = {
            id: this.products[index].id,
            ...data
        }

        return this.products[index]
    }

    updatePartial (id, data) {
        const index = this.products.findIndex(product => product.id === id)

        this.products[index] = {
            ...this.products[index],
            ...data
        }

        return this.products[index]
    }

    delete(id) {
        const index = this.products.findIndex(product => product.id === id)
        const product = this.products.splice(index, 1)

        return product
    }
}

module.exports = ProductService;
