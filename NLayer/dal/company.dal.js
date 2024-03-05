const Company = require('../models/company.model')

const CompanyDataAccess = { 
    async create(companyModel) {
        return await companyModel.save()
    },
    async updateById(id,body) {
        return await Company.findByIdAndUpdate({ _id: id }, body)
    },
    async listAll() {
        return await Company.find().select('_id name year description logo createdAt updatedAt')
    },
    async deleteById(id) {
        return await Company.findByIdAndDelete({ _id: id })
    },
    async getCompanyById(id) { 
        return await Company.findById({_id: id}).select('_id name year description logo createdAt updatedAt')
    }
} 

module.exports = CompanyDataAccess