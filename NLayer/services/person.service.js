const Person = require('../models/persons.model')
const personDal = require('../dal/index')
const utils = require('../utils/index')
const personDto = require('../dto/person.dto')
const fileService = require('./file.service')


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
        const str = await fileService.uploadFile(req)
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