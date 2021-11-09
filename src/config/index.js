console.log(process.env.DB_USER)
const config = {
    env: process.env.NODE_ENV || 'dev',
    port: process.env.PORT || 3000,
    db: {
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT || 5432,
        name: process.env.DB_NAME,
        host: process.env.DB_HOST || 'localhost',
    }
}

module.exports = config
