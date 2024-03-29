const Company = require('../models/company.model')
const companyDal = require('../dal/index')
const personDal = require('../dal/person.dal')
const titleDal = require('../dal/title.dal')
const companyDto = require('../dto/company.dto')
const fileService = require('./file.service')
const utils = require('../utils/index')

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
        const { id } = req.query
        const str = await fileService.uploadImage(req)
        const json = await companyDal.company.updateById(id, { logo: str })
        return {
            ...companyDto,
            name: json.name,
            year: json.year,
            description: json.description,
            id: json.id,
            logo: str,
            createdAt: json.createdAt,
            updatedAt: json.updatedAt
        }
    } catch (error) {
        throw new Error(error) // throw error to be caught by the controller
    }
}

exports.updateLogo = async (req) => {
    try {
        const { id } = req.query
        const str = await fileService.uploadImage(req)
        const findedCompany = await companyDal.company.getCompanyById(id)
        const isLogoDeleted = utils.helpers.deleteFromDisk(findedCompany.logo ? findedCompany.logo.split('uploads/')[1] : '')
        if(isLogoDeleted){ 
            const json = await companyDal.company.updateById(id, { logo: str })
            return {
                ...companyDto,
                name: json.name,
                year: json.year,
                description: json.description,
                id: json.id,
                logo: str,
                createdAt: json.createdAt,
                updatedAt: json.updatedAt
            }
        }
        throw new Error('Logo could not be updated')
    } catch (error) {
        throw new Error(error) // throw error to be caught by the controller
    }
}

exports.listCompany = async () => {
    try {
        const json = await companyDal.company.listAll()
        return {
            ...companyDto,
            name: json.name,
            year: json.year,
            description: json.description,
            id: json.id,
            logo: json.logo,
            createdAt: json.createdAt,
            updatedAt: json.updatedAt
        }
    } catch (error) {
        throw new Error(error)
    }
}

exports.deleteCompanyById = async (req) => {
    try {
        const { id } = req.query
        const findedCompany = await companyDal.company.getCompanyById(id)
        const isLogoDeleted = utils.helpers.deleteFromDisk(findedCompany.logo ? findedCompany.logo.split('uploads/')[1] : '')
        if (isLogoDeleted) {
            const persons =await personDal.person.listAll({company:id})

            persons.forEach(async (person) => {
                utils.helpers.deleteFromDisk(person.avatar ? person.avatar.split('uploads/')[1] : '')
                utils.helpers.deleteFromDisk(person.cvFile ? person.cvFile.split('uploads/')[1] : '')
                const findedTitle = await titleDal.getTitleById(person.title)
                const newPersonsForTitle = findedTitle.persons.filter((item) => item.toString() != findedTitle._id.toString())
                await titleDal.updateById(findedTitle._id, { persons: newPersonsForTitle })
            })
            
            await personDal.person.deleteMany({company:id})
            const json = await companyDal.company.deleteById(id)
            return {
                ...companyDto,
                name: json.name,
                year: json.year,
                description: json.description,
                id: json.id,
                logo: json.logo,
                createdAt: json.createdAt,
                updatedAt: json.updatedAt
            }
        }
        throw new Error('Logo could not be deleted')
    } catch (error) {
        throw new Error(error)
    }
}

exports.getPersonsById = async (req) => { 
    try { 
        const { id } = req.params
        const json = await companyDal.company.getCompanyByPersonId({ _id: id }, {
            path: 'persons',
            select: 'persons _id name surname tcNumber '
        })
        return json.persons
    } catch (error) {
        throw new Error(error)
    }
}

exports.getCompanyById = async (req) => {
    try {
        const { id } = req.params
        const json = await companyDal.company.getCompanyById(id)
        return {
            ...companyDto,
            name: json.name,
            year: json.year,
            description: json.description,
            id: json.id,
            logo: json.logo,
            createdAt: json.createdAt,
            updatedAt: json.updatedAt
        }
    } catch (error) {
        throw new Error(error)
    }
}

exports.updateCompany = async (req) => {
    try {
        const { name, year, description } = req.body
        const { id } = req.params
        const json = await companyDal.company.updateById(id, { name, year, description })
        return {
            ...companyDto,
            name: name,
            year: year,
            description: description,
            id: json.id,
            createdAt: json.createdAt,
            updatedAt: json.updatedAt
        }

    } catch (error) {
        throw new Error(error) // throw error to be caught by the controller
    }
}