const Title = require('../models/titles.model')

const TitleDataAccess = { 
    async create(titleModel) {
        return await titleModel.save()
    },
    async updateById(id,body) {
        return await Title.findByIdAndUpdate({ _id: id }, body)
    },
    async listAll() {
        return await Title.find().select('_id name createdAt updatedAt')
    },
    async deleteById(id) {
        return await Title.findByIdAndDelete({ _id: id })
    },
    async getCompanyById(id) { 
        return await Title.findById({_id: id}).select('_id name createdAt updatedAt')
    }
} 

module.exports = TitleDataAccess