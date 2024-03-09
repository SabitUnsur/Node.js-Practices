const Person = require('../models/persons.model')
const personDal = require('../dal/index')
const utils = require('../utils/index')
const personDto = require('../dto/person.dto')
const fileService = require('./file.service')
const titleDal = require('../dal/index')
const companyDal = require('../dal/index')
const personCompanyDto = require('../dto/person.company.dto')
const personTitleDto = require('../dto/person.title.dto')

exports.signIn = async (req) => {
    try {
        const {
            email,
            password
        } = req.body

        const _password = utils.helpers.hashToPassword(password)
        const json = await personDal.person.findOne({ email, password: _password })
        if (json) {
            const token = utils.helpers.createToken(json._id, json.name + "" + json.surname, json.email)
            return { fullName: json.name + "" + json.surname, email: json.email, id: json._id, token }
        }
        return null

    } catch (error) {
        throw new Error(error)
    }
}

exports.createPerson = async (req) => {
    try {
        const {
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
        const findedTitle = await titleDal.title.getTitleById(title)
        const findedCompany = await companyDal.company.getCompanyById(company)
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
            avatar: "",
            cvFile: ""
        })
        const json = await personDal.person.create(person)
        findedTitle.persons.push(json._id)
        findedCompany.persons.push(json._id)
        await companyDal.company.create(findedCompany)
        await titleDal.title.create(findedTitle)
        return {
            ...personDto,
            name: json.name,
            surname: json.surname,
            birthDate: new Date(json.birthDate),
            gender: json.gender,
            salary: new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'YTL' }).format(json.salary),
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
        const person = await personDal.person.findOne({ email })
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
        return {
            ...personDto,
            name: json.name,
            surname: json.surname,
            birthDate: new Date(json.birthDate),
            gender: json.gender,
            salary: new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'YTL' }).format(json.salary),
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

exports.updateAvatar = async (req) => {
    try {
        const { id } = req.query
        const str = await fileService.uploadImage(req)
        const findedPerson = await personDal.person.getPersonById(id)
        const isAvatarDeleted = utils.helpers.deleteFromDisk(findedPerson.avatar ? findedPerson.avatar.split('uploads/')[1] : '')
        if (isAvatarDeleted) {
            const json = await personDal.person.updateById(id, { avatar: str })
            return {
                ...personDto,
                name: json.name,
                surname: json.surname,
                birthDate: new Date(json.birthDate),
                gender: json.gender,
                salary: new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'YTL' }).format(json.salary),
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
        }
        throw new Error('Logo could not be updated')
    } catch (error) {
        throw new Error(error) // throw error to be caught by the controller
    }
}


exports.uploadCv = async (req) => {
    try {
        const { id } = req.query
        const str = await fileService.uploadCv(req)
        const json = await personDal.person.updateById(id, { cvFile: str })
        return {
            ...personDto,
            name: json.name,
            surname: json.surname,
            birthDate: new Date(json.birthDate),
            gender: json.gender,
            salary: new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'YTL' }).format(json.salary),
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


exports.updateCv = async (req) => {
    try {
        const { id } = req.query
        const str = await fileService.uploadCv(req)
        const findedPerson = await personDal.person.getPersonById(id)
        const isCvDeleted = utils.helpers.deleteFromDisk(findedPerson.cvFile ? findedPerson.cvFile.split('uploads/')[1] : '')
        if (isCvDeleted) {
            const json = await personDal.person.updateById(id, { cvFile: str })
            return {
                ...personDto,
                name: json.name,
                surname: json.surname,
                birthDate: new Date(json.birthDate),
                gender: json.gender,
                salary: new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'YTL' }).format(json.salary),
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
        }
        throw new Error('Logo could not be updated')
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
        return { ...personCompanyDto, name: json.company.name, year: json.company.year, id: json.company._id }
    } catch (error) {
        throw new Error(error)
    }
}

exports.getTitleByPersonId = async (req) => {
    try {
        const { id } = req.params
        const json = await personDal.person.getTitleByPersonId({ _id: id }, {
            path: 'title',
            select: '_id name'
        })
        return { ...personTitleDto, name: json.title.name, id: json.title._id }
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
            gender: json.gender,
            salary: new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'YTL' }).format(json.salary),
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

exports.getAllList = async () => {
    try {
        const json = await personDal.person.listAll({}, [{
            path: 'company',
            select: 'company _id year name',
            //match: { year: { $gte: 2010 } } // filter by year greater than or equal to 2010 
        },
        {
            path: 'title',
            select: '_id name'
        }
        ])
        return json
    } catch (error) {
        throw new Error(error)
    }
}

exports.getAllListWithPagination = async (req) => {
    try {
        const { perPage, page, sortBy, sortDirection } = req.query
        const json = await personDal.person.listAllWithPagination({}, [{
            path: 'company',
            select: 'company _id year name',
            //match: { year: { $gte: 2010 } } // filter by year greater than or equal to 2010 
        },
        {
            path: 'title',
            select: '_id name'
        }
        ], perPage, perPage * (page - 1), { [sortBy]: sortDirection })  // [sortBy]:sortDirection => amacı dinamik olarak sortBy ve sortDirection değerlerini almak için kullanılır
        return json
    } catch (error) {
        throw new Error(error)
    }
}

exports.updatePerson = async (req) => {
    try {
        const {
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
        const { id } = req.params
        const json = await personDal.person.updateById(id, {
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
            title
        })
        return {
            ...personDto,
            id: json._id,
            name,
            surname,
            birthDate: new Date(birthDate),
            gender: gender,
            salary: new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'YTL' }).format(salary),
            tcNumber: tcNumber,
            email: email,
            country: country,
            city: city,
            company: company,
            title: title,
            avatar: json.avatar,
            cvFile: json.cvFile,
        }

    } catch (error) {
        throw new Error(error) // throw error to be caught by the controller
    }
}

exports.deletePersonById = async (req) => {
    try {
        const { id } = req.query
        const findedPerson = await personDal.person.getPersonById(id)
        const isAvatarDeleted = utils.helpers.deleteFromDisk(findedPerson.avatar ? findedPerson.avatar.split('uploads/')[1] : '')
        const isCvDeleted = utils.helpers.deleteFromDisk(findedPerson.avatar ? findedPerson.cvFile.split('uploads/')[1] : '')
        if (isAvatarDeleted && isCvDeleted) {
            const json = await personDal.person.deleteById(id)

            const findedTitle = await titleDal.title.getTitleById(json.title)
            const newTitles = findedTitle.persons.filter((item) => item.toString() !== json._id.toString())
            await titleDal.title.updateById(findedTitle._id, { persons: newTitles })

            const findedCompany = await companyDal.company.getCompanyById(json.company)
            const newCompanies = findedCompany.persons.filter((item) => item.toString() !== json._id.toString())
            await companyDal.company.updateById(findedCompany._id, { persons: newCompanies })

            //bu işlemleri database olustururken yapmak daha mantıklıdır, cascade olarak belirtiriz ve silme işlemi otomatik olarak yapılır
            return {
                ...personDto,
                name: json.name,
                surname: json.surname,
                birthDate: new Date(json.birthDate),
                gender: json.gender,
                salary: new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'YTL' }).format(json.salary),
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
        }
        throw new Error('Logo could not be deleted')
    } catch (error) {
        throw new Error(error)
    }
}
