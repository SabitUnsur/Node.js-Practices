const express = require('express')
const router = express.Router()
const controller = require('../controllers/index')

router.get('/all', controller.companyController.getAllCompany)
router.get('/getById/:companyId', controller.companyController.getCompanyById)
router.post('/create', controller.companyController.createCompany)
router.put('/update/:companyId', controller.companyController.updateCompany)
router.delete('/delete/:companyId', controller.companyController.deleteCompanyById)

module.exports={
    company:router
}