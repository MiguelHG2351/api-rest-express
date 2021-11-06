const { Router } = require('express');
const router = Router();
const faker = require('faker')

router.get('/', (req, res) => {
    const { limit } = req.query
    const size = limit || 10
    const products = [];
    for (let index = 0; index < size; index++) {
        products.push({
            id: faker.random.uuid(),
            name: faker.commerce.productName(),
            price: faker.commerce.price() - 0,
            image: faker.image.imageUrl()
        })
    }
    
    res.json(products)
})

// Los endpoint especificos tienen que ir antes de los dinámicos
router.get('/filter', (req, res) => {
    res.send(':D')
})

router.get('/:id', (req, res) => {
    const { id } = req.params
    
    res.json({
        id,
        name: 'Poco X3 Pro',
        price: '$1.99'
    })
})

router.patch('/:id', (req, res) => {
    const { id } = req.params
    const body = req.body

    res.json({
        message: 'updated',
        data: body,
        id
    })    
})

router.delete('/:id', (req, res) => {
    const { id } = req.params

    res.json({
        message: 'deleted',
        id
    })    
})

router.post('/', (req, res) => {
    const body = req.body

    res.json({
        message: 'created',
        data: body
    })
})

module.exports = router;
