const CompanyDataAccess = { 
    async create(companyModel) {
        return await companyModel.save()
    }
} 

module.exports = CompanyDataAccess