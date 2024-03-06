const authMiddleware = require('./auth.middleware')
const loggerMiddleware = require('./logger.middleware')
const singleImageUploadMiddleware = require('./singleimageupload.middleware')
const singleCvUploadMiddleware = require('./singlecvupload.middleware')

module.exports = {
    authMiddleware,
    loggerMiddleware,
    singleImageUploadMiddleware,
    singleCvUploadMiddleware
}