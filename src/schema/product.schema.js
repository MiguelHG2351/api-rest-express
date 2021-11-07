const joi = require('joi')

const id = joi.string().uuid()
const name = joi.string().min(3)
const price = joi.number().min(10).integer()
const image = joi.string().uri()

const createProductSchema = joi.object({
    name: name.required(),
    price: price.required(),
    image: image.required()
})

const updateProductSchema = joi.object({
    name,
    price,
    image
})

const getProductSchema = joi.object({
    id: id.required()
})

module.exports = {
    id,
    getProductSchema,
    createProductSchema,
    updateProductSchema
}
