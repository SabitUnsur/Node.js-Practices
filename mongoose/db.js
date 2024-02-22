const mongoose = require('mongoose');

exports.connectMongoDb = async () => {
    try {
         await mongoose.connect('mongodb://localhost:27017/mytestdb',{
            minPoolSize: 10,
            maxPoolSize: 40,
            autoIndex: true,
            compressors: 'zlib',
            connectTimeoutMS:5000
         })
         console.log('MongoDB connection successful');
    } catch (error) {
        console.log('MongoDB connection failed');
    }
}