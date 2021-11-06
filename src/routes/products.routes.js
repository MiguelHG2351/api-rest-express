const { Router } = require('express');
const ProductServices = require('../services/product.services')

const router = Router();
const service = new ProductServices();

router.get('/', async (req, res, next) => {
    try {
        const products = await service.getAll()
        res.status(200).json(products)
    } catch (error) {
        next(error)
    }
})

// Los endpoint especificos tienen que ir antes de los dinámicos
router.get('/filter', (req, res) => {
    res.send(':D')
})

router.get('/:id', async (req, res, next) => {
    const { id } = req.params

    if(id === '999') {
        return res.status(404).json({
            message: 'Product not found'
        })
    }
    try {
        const product = await service.get(id)
        res.json(product)
    } catch (error) {
        next(error)
    }
})

router.put('/:id', async (req, res, next) => {
    const { id } = req.params
    const body = req.body
    
    if(!body.image || !body.name || !body.price) {
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
        next(error)
    }

})

router.patch('/:id', async (req, res, next) => {
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
        next(error)
    }

})

router.delete('/:id', async (req, res, next) => {
    const { id } = req.params
    try {
        const product = await service.delete(id)
        res.status(202).json({
            message: 'deleted',
            data: product
        })
    } catch (error) {
        next(error)
    }

})

router.post('/', async (req, res, next) => {
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
        next(error)
    }

})

module.exports = router;
