const Company = require('../models/company.model')
const companyDal = require('../dal/index')
const companyDto = require('../dto/company.dto')
const utils = require('../utils/index')

exports.createCompany = async (req) => {
    try {
        const ip = await utils.helpers.getHost()
        const filePath = process.env.FILE_PATH
        const fileName = req.file.filename
        const LogoString = `${ip}${filePath}${fileName}`
        const { name, year, description } = req.body
        const company = new Company({ name, year, description, logo: LogoString })
        const json = await companyDal.company.create(company)
        return {
            ...companyDto,
            name: json.name,
            year: json.year,
            description: json.description,
            id: json.id,
            createdAt: json.createdAt,
            updatedAt: json.updatedAt
        }

    } catch (error) {
        throw new Error(error) // throw error to be caught by the controller
    }
}
