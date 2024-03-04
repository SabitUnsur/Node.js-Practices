const express = require('express')
const router = express.Router()
const controller = require('../controllers/index')

router.get('/all', controller.personController.getAllPersons)
router.get('/getById/:personId', controller.personController.getPersonById)
router.post('/create', controller.personController.createPerson)
router.put('/update/:personId', controller.personController.updatePerson)
router.delete('/delete/:personId', controller.personController.deletePersonById)


module.exports = {
    person: router
}