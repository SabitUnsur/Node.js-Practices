const express = require('express')
const configs = require('./configs/index')
const db = require('./db/index')
const { default: helmet } = require('helmet')
const cors = require('cors')
const router = require('./router/index')
const routerConsts = require('./consts/index')
const middleware = require('./middleware/index')

const app = express()
const PORT = process.env.PORT || 5000

configs.serverConfig.initialServerConfig()

app.use(express.json())
app.use(helmet()) //helmet, uygulamanin guvenligini saglamak icin kullanilir, http headerlarini duzenler ve guvenlik saglar
app.use(cors()) //cors, farkli domainlerden gelen istekleri kabul etmek icin kullanilir yani domain derken farkli sunuculardan gelen istekleri kabul etmek icin kullanilir

app.use(middleware.loggerMiddleware) //middleware, uygulamanin herhangi bir yerinde kullanilabilen bir fonksiyon
app.use(middleware.authMiddleware)

app.use(`${process.env.APP_PREFIX}${routerConsts.routerPrefix.COMMON}`,router.commonRouter.common)
app.use(`${process.env.APP_PREFIX}${routerConsts.routerPrefix.COMPANY}`,router.companyRouter.company)
app.use(`${process.env.APP_PREFIX}${routerConsts.routerPrefix.PERSON}`,router.personRouter.person)
app.use(`${process.env.APP_PREFIX}${routerConsts.routerPrefix.TITLES}`,router.titlesRouter.titles)
app.use(`${process.env.APP_PREFIX}${routerConsts.routerPrefix.AUTH}`,router.authRouter.auth)


db.mongooseConnection.
connectToMongoDB(process.env.MONGODB_HOST, process.env.MONGODB_PORT,
    process.env.MONGODB_COLLECTION, process.env.MONGODB_MIN_POOL_SIZE,
    process.env.MONGODB_MAX_POOL_SIZE,
    process.env.MONGODB_CONNECTION_TIMEOUT).then(() => {
    app.listen(PORT, () => {
    })
})
