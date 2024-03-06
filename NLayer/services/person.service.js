const Person = require('../models/persons.model')
const personDal = require('../dal/index')
const utils = require('../utils/index')
const personDto = require('../dto/person.dto')
const fileService = require('./file.service')
const personCompanyDto = require('../dto/person.company.dto')
const personTitleDto = require('../dto/person.title.dto')

exports.createPerson = async (req) => {
    try {
        const  {
            name,
            surname,
            birthDate,
            gender,
            salary,
            tcNumber,
            email,
            password,
            country,
            city,
            company,
            title
        } = req.body
        const person = new Person({
            name,
            surname,
            birthDate,
            gender,
            salary,
            tcNumber,
            email,
            password: utils.helpers.hashToPassword(password),
            country,
            city,
            company,
            title,
            avatar:"",
            cvFile:""
        })
        const json = await personDal.person.create(person)
        return  {
            ...personDto,
            name: json.name,
            surname: json.surname,
            birthDate: new Date(json.birthDate),
            gender:json.gender,
            salary:  new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'YTL' }).format(json.salary),
            tcNumber: json.tcNumber,
            email: json.email,
            country: json.country,
            city: json.city,
            company: json.company,
            title: json.title,
            avatar: json.avatar,
            cvFile: json.cvFile,
            id: json.id,
            createdAt: json.createdAt,
            updatedAt: json.updatedAt
        }
    } catch (error) {
        throw new Error(error) // throw error to be caught by the controller
    }
}

exports.findByEmail = async (email) => { 
    try {
        const person = await personDal.person.findOne({email})
        return person
    } catch (error) {
        throw new Error(error)
    }
}

exports.uploadAvatar = async (req) => {
    try {
        const { id } = req.query
        const str = await fileService.uploadImage(req)
        const json = await personDal.person.updateById(id, { avatar: str })
        return  {
            ...personDto,
            name: json.name,
            surname: json.surname,
            birthDate: new Date(json.birthDate),
            gender:json.gender,
            salary:  new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'YTL' }).format(json.salary),
            tcNumber: json.tcNumber,
            email: json.email,
            country: json.country,
            city: json.city,
            company: json.company,
            title: json.title,
            avatar: str,
            cvFile: json.cvFile,
            id: json.id,
            createdAt: json.createdAt,
            updatedAt: json.updatedAt
        }
    } catch (error) {
        throw new Error(error) // throw error to be caught by the controller
    }
}


exports.uploadCv = async (req) => {
    try {
        const { id } = req.query
        const str = await fileService.uploadCv(req)
        const json = await personDal.person.updateById(id, { cvFile: str })
        return  {
            ...personDto,
            name: json.name,
            surname: json.surname,
            birthDate: new Date(json.birthDate),
            gender:json.gender,
            salary:  new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'YTL' }).format(json.salary),
            tcNumber: json.tcNumber,
            email: json.email,
            country: json.country,
            city: json.city,
            company: json.company,
            title: json.title,
            avatar: json.avatar,
            cvFile: str,
            id: json.id,
            createdAt: json.createdAt,
            updatedAt: json.updatedAt
        }
    } catch (error) {
        throw new Error(error) // throw error to be caught by the controller
    }
}

exports.getCompanyByPersonId = async (req) => { 
    try {
        const { id } = req.params
        const json = await personDal.person.getCompanyByPersonId({ _id: id }, {
            path: 'company',
            select: 'company _id year name'
        })
        return {...personCompanyDto, name: json.company.name, year: json.company.year, id: json.company._id }
    } catch (error) {
        throw new Error(error)
    }
}

exports.getTitleByPersonId= async (req) => { 
    try {
        const { id } = req.params
        const json = await personDal.person.getTitleByPersonId({ _id: id }, {
            path: 'title',
            select: '_id name'
        })
        return {...personTitleDto, name: json.title.name, id: json.title._id}
    } catch (error) {
        throw new Error(error)
    }
}

exports.getPersonById = async (req) => { 
    try {
        const { id } = req.params
        const json = await personDal.person.getPersonById(id)
        delete personDto.title
        delete personDto.company
        return {
            ...personDto,
            name: json.name,
            surname: json.surname,
            birthDate: new Date(json.birthDate),
            gender:json.gender,
            salary:  new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'YTL' }).format(json.salary),
            tcNumber: json.tcNumber,
            email: json.email,
            country: json.country,
            city: json.city,
            avatar: json.avatar,
            cvFile: json.cvFile,
            id: json.id,
            createdAt: json.createdAt,
            updatedAt: json.updatedAt
        }
    } catch (error) {
        throw new Error(error)
    }
}