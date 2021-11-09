const joi = require('joi')

const id = joi.number()
const email = joi.string().email()
const password = joi.string()

const createUserchema = joi.object({
    email: email.required(),
    password: password.required(),
})

const updateUserchema = joi.object({
    email,
    password,
})

const getUserchema = joi.object({
    id: id.required()
})

module.exports = {
    id,
    getUserchema,
    createUserchema,
    updateUserchema
}
