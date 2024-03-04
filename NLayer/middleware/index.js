const authMiddleware = require('./auth.middleware')
const loggerMiddleware = require('./logger.middleware')
const singleFileUploadMiddleware = require('./singlefileupload.middleware')

module.exports = {
    authMiddleware,
    loggerMiddleware,
    singleFileUploadMiddleware
}