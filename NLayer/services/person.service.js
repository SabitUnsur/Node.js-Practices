const Person = require('../models/persons.model')
const personDal = require('../dal/index')
const utils = require('../utils/index')
const personDto = require('../dto/person.dto')


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
        return  json
        

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
