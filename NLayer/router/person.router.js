const express = require('express')
const router = express.Router()
const controller = require('../controllers/index')
const personValidator = require('../validations/index')

router.get('/all', controller.personController.getAllPersons)
router.get('/getById/:personId', controller.personController.getPersonById)
router.post('/create',[personValidator.personValidator.validateCreatePerson()],controller.personController.createPerson)
router.put('/update/:personId', controller.personController.updatePerson)
router.post('/uploadCv',[personValidator.personValidator.validateUploadCv()] ,controller.personController.uploadCv)
router.post('/uploadAvatar',[personValidator.personValidator.validateUploadAvatar()] ,controller.personController.uploadAvatar)
router.delete('/delete/:personId', controller.personController.deletePersonById)
router.get('/getCompany/:id', controller.personController.getCompanyByPersonId)

module.exports = {
    person: router
}