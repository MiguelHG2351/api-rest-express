const express = require('express')
const app = express()

const routesApi = require('./routes')

const port = process.env.PORT || 3000

app.use(express.json())
routesApi(app)

app.get('/api', (req, res) => {
    res.send('Hello World!')
})

app.get('/new-route', (req, res) => {
    res.send('New route!')
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
