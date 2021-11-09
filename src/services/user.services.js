const boom = require('@hapi/boom')
const { models } = require('../libs/sequelize')

class UserServices {
    async create(data) {
        try {
            const newUser = await models.User.create(data)
            return newUser
        } catch (err) {
            throw boom.badRequest(err)
        }
    }

    async find(id) {
        const rta = await models.User.findAll()
        return rta
    }

    async findOne(id) {
        const user = await models.User.findByPk(id)
        if(!user) {
            throw boom.notFound('user not found')
        }
        return user
    }

    async update(id, change) {
        const user = await models.User.findByPk(id)
        if(!user) {
            throw boom.notFound('user not found')
        }
        const rta = await user.update(change)
        return rta
    }

    async delete(id) {
        const user = await models.User.findByPk(id)
        if(!user) {
            throw boom.notFound('user not found')
        }
        user.destroy()
        return user
    }
}

module.exports = UserServices
