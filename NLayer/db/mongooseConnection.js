const mongoose = require('mongoose')
const logger = require('../utils/index')
exports.connectToMongoDB = async(host,port,collection,minPoolSize,maxPoolSize,connectTimeoutMS) => { 
    try {
        await mongoose.connect(`mongodb://${host}:${port}/${collection}`, {
            compressors:"zlib",
            autoIndex: true,
            minPoolSize,
            maxPoolSize,
            connectTimeoutMS,
         })
         logger.logger.info('Connected to MongoDB')
    } catch (error) {
        logger.info(`Error ${error.message} occured while connecting to MongoDB`)
        throw new Error(error.message)
    }
}