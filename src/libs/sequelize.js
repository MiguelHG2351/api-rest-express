const { Sequelize } = require('sequelize')

const config = require('../config')
const setupModels = require('../db/models')

const USER = encodeURIComponent(config.db.user)
const PASSWORD = encodeURIComponent(config.db.password)
const URI = `mysql://${USER}:${PASSWORD}@${config.db.host}:${config.db.port}/${config.db.name}`

const sequelize = new Sequelize(URI, {
    dialect: 'mysql',
    loggin: true
})

setupModels(sequelize)
sequelize.sync()

module.exports = sequelize
