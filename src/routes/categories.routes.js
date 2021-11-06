const { Router } = require('express');
const router = Router();

router.get('/:id/products/:pro', (req, res) => {
    const {  id, pro } = req.params

    res.json({
        id,
        name: 'Poco X3 Pro',
        price: '$1.99',
        productId: pro
    })
})

module.exports = router;
