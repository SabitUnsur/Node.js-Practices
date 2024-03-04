const Company = require('../models/company.model')
const companyDal = require('../dal/index')
const companyDto = require('../dto/company.dto')
const fileService = require('./file.service')

exports.createCompany = async (req) => {
    try {
        const { name, year, description } = req.body
        const company = new Company({
            name,
            year,
            description,
            logo: '' 
        })
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


exports.uploadLogo = async (req) => {
    try {
        const {id} = req.query
       const str = await fileService.uploadFile(req) 
       const json = await companyDal.company.updateById(id,{logo:str})
       return {
        ...companyDto,
        name: json.name,
        year: json.year,
        description: json.description,
        id: json.id,
        logo:str,
        createdAt: json.createdAt,
        updatedAt: json.updatedAt
    }
    } catch (error) {
        throw new Error(error) // throw error to be caught by the controller
    }
}