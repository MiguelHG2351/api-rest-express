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

function boomErrorHandler(err, _, res, next) {
    if(err.isBoom) {
        const { output } = err
        res.status(output.statusCode).json(output.payload)
    }
    next(err)
}

module.exports = { 
    logErrors,
    errorHandler,
    boomErrorHandler
}
