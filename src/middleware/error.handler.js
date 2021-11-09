function logErrors(err, req, res, next) {
    console.error(err)
    next(err)
}

function errorHandler(err, _, res, __) {
    res.status(500).json({
        message: err.message,
        stack: err.stack
    })
}

function sequelizeErrorHandler(err, req, res, next) {
    if(err.parent) {
        const { fields, parent, output: { statusCode } } = err
        return res.status(409).json({
            statusCode,
            message: parent.detail,
            fields
        })
    }
    next(err)
}

function boomErrorHandler(err, _, res, next) {
    if(err.isBoom) {
        const { output } = err
        return res.status(output.statusCode).json(output.payload)
    }
    next(err)
}

module.exports = { 
    logErrors,
    errorHandler,
    boomErrorHandler,
    sequelizeErrorHandler
}
