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

router.get('/:id', async (req, res) => {
    const { id } = req.params

    if(id === '999') {
        return res.status(404).json({
            message: 'Product not found'
        })
    }
    try {
        const product = service.get(id)
        res.json(product)
    } catch (error) {
        res.status(500).json({
            message: 'Error getting product'
        })
    }
})

router.put('/:id', async (req, res) => {
    const { id } = req.params
    const body = req.body
    
    if(!body.image && !body.name && !body.price) {
        res.status(400).json({
            message: 'Faltan parametros'
        })
    }
    try {
        const product = service.update(id, body)
        res.status(202).json({
            message: 'updated',
            data: product,
            id
        })
    } catch (error) {
        res.status(500).json({
            message: 'Error updating product'
        })
    }

})

router.patch('/:id', async (req, res) => {
    const { id } = req.params
    const  body = req.body

    try {
        const product = await service.updatePartial(id, body)
        res.json({
            message: 'updated',
            data: product,
            id
        })
    } catch (error) {
        res.status(500).json({
            message: 'Error updating product'
        })
    }

})

router.delete('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const product = await service.delete(id)
        res.status(202).json({
            message: 'deleted',
            data: product
        })
    } catch (error) {
        res.status(500).json({
            message: 'Error deleting product'
        })
    }

})

router.post('/', async (req, res) => {
    const { name, price, image } = req.body
    try {
        const product = await service.create({
            name,
            price,
            image
        })
        res.status(201).json({
            message: 'created',
            data: product
        })
    } catch (error) {
        res.status(500).json({
            message: 'Error',
            data: error
        })
    }

})

module.exports = router;
