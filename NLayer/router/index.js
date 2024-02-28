const commonRouter = require('./common.router')
const companyRouter = require('./company.router')
const personRouter = require('./person.router')
const titlesRouter = require('./titles.router')
const authRouter = require('./auth.router')

module.exports = {
    commonRouter,
    companyRouter,
    personRouter,
    titlesRouter,
    authRouter
}