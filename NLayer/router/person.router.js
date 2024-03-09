const express = require('express')
const router = express.Router()
const controller = require('../controllers/index')
const personValidator = require('../validations/index')

router.get('/all', controller.personController.getAllPersons)
router.get('/allWithPagination',[personValidator.personValidator.validateListPagination()] ,controller.personController.getAllPersonsWithPagination)
router.get('/getById/:id',[personValidator.personValidator.validateGetPersonById()] ,controller.personController.getPersonById)
router.post('/create',[personValidator.personValidator.validateCreatePerson()],controller.personController.createPerson)
router.put('/update/:id',[personValidator.personValidator.validateUpdatePerson()],controller.personController.updatePerson)
router.post('/uploadCv',[personValidator.personValidator.validateUploadCv()] ,controller.personController.uploadCv)
router.post('/updateCv',[personValidator.personValidator.validateUpdateCv()] ,controller.personController.updateCv)
router.post('/uploadAvatar',[personValidator.personValidator.validateUploadAvatar()] ,controller.personController.uploadAvatar)
router.post('/updateAvatar',[personValidator.personValidator.validateUpdateAvatar()] ,controller.personController.updateAvatar)
router.delete('/delete',[personValidator.personValidator.validateDeleteById()] ,controller.personController.deletePersonById) //queryden alınacagı zaman :id yazmaya gerek yok 
router.get('/getCompany/:id',[personValidator.personValidator.validateGetCompanyByPersonId()] ,controller.personController.getCompanyByPersonId)
router.get('/getTitle/:id',[personValidator.personValidator.validateGetTitleByPersonId()] ,controller.personController.getTitleByPersonId)
router.post('/signIn',[personValidator.personValidator.validateSignIn()] ,controller.personController.signIn)

module.exports = {
    person: router
}