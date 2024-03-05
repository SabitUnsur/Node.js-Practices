const express = require('express')
const router = express.Router()
const controller = require('../controllers/index')
const titleValidator = require('../validations/index')

router.get('/all', controller.titlesController.getAllTitles)
router.get('/getById/:id',[titleValidator.titleValidator.validateFindById()] ,controller.titlesController.getTitleById)
router.post('/create',[titleValidator.titleValidator.validateCreateTitle()] ,controller.titlesController.createTitle)
router.put('/update/:id',[titleValidator.titleValidator.validateUpdateTitle()] ,controller.titlesController.updateTitle)
router.delete('/delete',[titleValidator.titleValidator.validateDeleteById()] ,controller.titlesController.deleteTitleById)

module.exports={
    titles:router
}