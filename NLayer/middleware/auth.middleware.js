const helpers = require('../utils/index')
const { StatusCodes } = require('http-status-codes')
const consts = require('../consts/index')

module.exports = (req, res, next) => {
    try {
        if (!req.url.includes('/api/v1/')) {
            const token = req.headers.authorization.split(' ')[1]
            console.log(token)
            const decodedToken = helpers.helpers.verifyToken(token)
            if (decodedToken.decodedToken == null) {
                return res.status(StatusCodes.UNAUTHORIZED).json({
                    message: consts.auth.AUTH.UNAUTHORIZATION_MESSAGE
                })
            }
            req.user = decodedToken
            next()
            return
        }
        next()
    } catch (error) {
        res.status(StatusCodes.UNAUTHORIZED).json({
            message: consts.auth.AUTH.UNAUTHORIZATION_MESSAGE
        })
    }
}