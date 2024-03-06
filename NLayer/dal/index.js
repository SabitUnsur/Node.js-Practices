const companyDal = require('./company.dal')
const titleDal = require('./title.dal')
const personDal = require('./person.dal')

module.exports = {
   company: companyDal,
   title: titleDal,
   person: personDal
}