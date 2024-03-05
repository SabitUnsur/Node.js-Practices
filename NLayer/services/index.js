const commonService = require('./common.service')
const companyService = require('./company.service')
const titleService = require('./title.service')

module.exports = {
    common: commonService,
    company: companyService,
    title: titleService
}