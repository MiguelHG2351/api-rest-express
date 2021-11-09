const { Router } = require('express');
const UserServices = require('../services/user.services')
const validationHandler = require('../middleware/validation.handler')
const { createUserchema, updateUserchema, getUserchema } = require('../schema/user.schema')
const router = Router();

router.get('/', async (req, res) => {
    const services = new UserServices()
    res.json(await services.find())
})

router.post('/',
    validationHandler(createUserchema, 'body'),
    async (req, res, next) => {
        const body = req.body
        const services = new UserServices()
        try {
            const create = await services.create(body)
            res.json(create)
        } catch(err) {
            next(err)
        } 
    }
)

router.get('/:id',
    validationHandler(getUserchema, 'params'),
    async (req, res, next) => {
        const { id } = req.params
        const services = new UserServices()
        try {
            const rta = await services.findOne(id)
            res.json(rta)
        } catch(err) {
            return next(err)
        }

    }
)

router.put('/:id',
    validationHandler(getUserchema, 'params'),
    validationHandler(updateUserchema, 'body'),
    async (req, res, next) => {
        const { id } = req.params
        const services = new UserServices()
        try {
            const rta = await services.update(id, req.body)
            res.json(rta)
        } catch(err) {
            return next(err)
        }

    }
)

router.patch('/:id',
    validationHandler(getUserchema, 'params'),
    validationHandler(updateUserchema, 'body'),
    async (req, res, next) => {
        const { id } = req.params
        const services = new UserServices()
        try {
            const rta = await services.update(id, req.body)
            res.json(rta)
        } catch(err) {
            return next(err)
        }

    }
)

router.delete('/:id',
    validationHandler(getUserchema, 'params'),
    async (req, res, next) => {
        const { id } = req.params
        const services = new UserServices()
        try {
            const rta = await services.delete(id)
            res.json(rta)
        } catch(err) {
            return next(err)
        }

    }
)


module.exports = router;
