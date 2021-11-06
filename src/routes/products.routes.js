const { Router } = require('express');
const ProductServices = require('../services/product.services')

const router = Router();
const service = new ProductServices();

router.get('/', (req, res) => {
    const products = service.getAll()
    res.json(products)
})

// Los endpoint especificos tienen que ir antes de los dinámicos
router.get('/filter', (req, res) => {
    res.send(':D')
})

router.get('/:id', (req, res) => {
    const { id } = req.params

    if(id === '999') {
        return res.status(404).json({
            message: 'Product not found'
        })
    }
    const product = service.get(id)

    
    res.json(product)
})

router.put('/:id', (req, res) => {
    const { id } = req.params
    const body = req.body
    
    if(!body.image && !body.name && !body.price) {
        res.status(400).json({
            message: 'Faltan parametros'
        })
    }
    const product = service.update(id, body)

    res.json({
        message: 'updated',
        data: product,
        id
    })
})

router.patch('/:id', (req, res) => {
    const { id } = req.params
    const  body = req.body

    const product = service.updatePartial(id, body)

    res.json({
        message: 'updated',
        data: product,
        id
    })
})

router.delete('/:id', (req, res) => {
    const { id } = req.params
    const product = service.delete(id)

    res.status(202).json({
        message: 'deleted',
        data: product
    })
})

router.post('/', (req, res) => {
    const { name, price, image } = req.body
    const product = service.create({
        name,
        price,
        image
    })

    res.status(201).json({
        message: 'created',
        data: product
    })
})

module.exports = router;
