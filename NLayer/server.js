const express = require('express')
const configs = require('./configs/index')
const db = require('./db/index')
const { default: helmet } = require('helmet')
const cors = require('cors')
const router = require('./router/index')

const app = express()
const PORT = process.env.PORT || 5000

configs.serverConfig.initialServerConfig()

app.use(express.json())
app.use(helmet())
app.use(cors())
app.use(`${process.env.APP_PREFIX}test`,router.test)

db.mongooseConnection.
connectToMongoDB(process.env.MONGODB_HOST, process.env.MONGODB_PORT,
    process.env.MONGODB_COLLECTION, process.env.MONGODB_MIN_POOL_SIZE,
    process.env.MONGODB_MAX_POOL_SIZE,
    process.env.MONGODB_CONNECTION_TIMEOUT).then(() => {
    app.listen(PORT, () => {
    })
})
