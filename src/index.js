const express = require('express')
const cors = require('cors')
const app = express()

const routesApi = require('./routes')
const { logErrors, errorHandler, boomErrorHandler } = require('./middleware/error.handler')

const port = process.env.PORT || 3000
const whiteList = ['http://localhost:3000/', 'https://rest-api-express-platzi.herokuapp.com']
const options = {
    origin: (origin, callback) => {
        if(whiteList.includes(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}

app.use(cors(options))
app.use(express.json())
routesApi(app)
app.use(logErrors)
app.use(boomErrorHandler)
app.use(errorHandler)

app.get('/api', (req, res) => {
    res.send('Hello World!')
})

app.get('/new-route', (req, res) => {
    res.send('New route!')
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
