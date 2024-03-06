const Person = require('../models/persons.model')


const PersonDataAccess = { 
    async create(personModel) {
        return await personModel.save()
    },
    async updateById(id,body) {
        return await Person.findByIdAndUpdate({ _id: id }, body)
    },
    async listAll() {
       // return await Person.find().select('_id name createdAt updatedAt')
    },
    async deleteById(id) {
        return await Person.findByIdAndDelete({ _id: id })
    },
    async getPersonById(id) { 
        return await Person.findById({_id: id})
    },
    async findOne(where){
        return await Person.findOne(where)
    },
    async getCompanyByPersonId(where, populate) { 
        return await Person.findOne(where).populate(populate)
    },
    async getTitleByPersonId(where, populate) { 
        return await Person.findOne(where).populate(populate)
    },
} 

module.exports = PersonDataAccess