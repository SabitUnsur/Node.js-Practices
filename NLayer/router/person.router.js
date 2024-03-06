const express = require('express')
const router = express.Router()
const controller = require('../controllers/index')
const personValidator = require('../validations/index')

router.get('/all', controller.personController.getAllPersons)
router.get('/getById/:id',[personValidator.personValidator.validateGetPersonById()] ,controller.personController.getPersonById)
router.post('/create',[personValidator.personValidator.validateCreatePerson()],controller.personController.createPerson)
router.put('/update/:id', controller.personController.updatePerson)
router.post('/uploadCv',[personValidator.personValidator.validateUploadCv()] ,controller.personController.uploadCv)
router.post('/uploadAvatar',[personValidator.personValidator.validateUploadAvatar()] ,controller.personController.uploadAvatar)
router.delete('/delete/:id', controller.personController.deletePersonById)
router.get('/getCompany/:id',[personValidator.personValidator.validateGetCompanyByPersonId()] ,controller.personController.getCompanyByPersonId)
router.get('/getTitle/:id',[personValidator.personValidator.validateGetTitleByPersonId()] ,controller.personController.getTitleByPersonId)

module.exports = {
    person: router
}