const Title = require('../models/titles.model')
const titleDal = require('../dal/index')
const titleDto = require('../dto/title.dto')
const personDal = require('../dal/person.dal')
const companyDal = require('../dal/company.dal')
const utils = require('../utils/index')

exports.createTitle = async (req) => {
    try {
        const {name} = req.body
        const title = new Title({
            name,
            persons:[]
        })
        const json = await titleDal.title.create(title)
        return {
            ...titleDto,
            name: json.name,
            id: json.id,
            createdAt: json.createdAt,
            updatedAt: json.updatedAt
        }

    } catch (error) {
        throw new Error(error) // throw error to be caught by the controller
    }
}


exports.listTitles = async () => { 
    try {
        const json = await titleDal.title.listAll()
        return json
    } catch (error) {
        throw new Error(error)
    }
}

exports.getPersonsByTitleId = async (req) => { 
    try {
        const { id } = req.params
        const json = await titleDal.title.getPersonsByTitleId({_id: id}, 
            {
                path: 'persons',
                select: 'name _id surname tcNumber'
            
            })
        return json.persons
    } catch (error) {
        throw new Error(error)
    }
}

exports.getTitleById = async (req) => { 
    try {
        const { id } = req.params
        const json = await titleDal.title.getTitleById(id)
        return {
            ...titleDto,
            name: json.name,
            id: json.id,
            createdAt: json.createdAt,
            updatedAt: json.updatedAt
        }
    } catch (error) {
        throw new Error(error)
    }
}

exports.updateTitle = async (req) => { 
    try {
        const { name } = req.body
        const { id } = req.params
        const json = await titleDal.title.updateById(id, { name })
        return {
            ...titleDto,
            name: name,
            id: json.id,
            createdAt: json.createdAt,
            updatedAt: json.updatedAt
        }

    } catch (error) {
        throw new Error(error) // throw error to be caught by the controller
    }
}

exports.deleteTitleById = async (req) => { 
    try {
        const { id } = req.query
        const json = await titleDal.title.deleteById(id)
        const persons = await personDal.listAll({title: id})
        persons.forEach(async (person) => {
            utils.helpers.deleteFromDisk(person.avatar ? person.avatar.split('uploads/')[1] : '')
            utils.helpers.deleteFromDisk(person.cvFile ? person.cvFile.split('uploads/')[1] : '')
            const findedCompany = await companyDal.getCompanyById(person.company)
            const newPersonsForCompany = findedCompany.persons.filter((item) => item.toString() != person._id.toString())
            await titleDal.updateById(findedCompany._id, { persons: newPersonsForCompany })
        });
        await personDal.deleteMany({title: id})
        return {...titleDto,name : json.name, id: json.id, createdAt: json.createdAt, updatedAt: json.updatedAt}
    }catch (error) {
        throw new Error(error) 
    }

}