const company = require('../models/company.model')
const companyDal = require('../dal/index')
exports.createCompany = async (req, res) => {
    try {
        const { name, year, description } = req.body
        const company = new company({ name, year, description, logo: 'logo'})
        const json = await companyDal.company.create(company)
        console.log(json)
    } catch (error) {
        throw new Error(error) // throw error to be caught by the controller
    }
}
