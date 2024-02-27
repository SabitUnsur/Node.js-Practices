const express = require('express')
const router = express.Router()
const controller = require('../controllers/index')

router.get('/all', controller.titlesController.getAllTitles)
router.get('/getById/:titleId', controller.titlesController.getTitleById)
router.post('/create', controller.titlesController.createTitle)
router.put('/update/:titleId', controller.titlesController.updateTitle)
router.delete('/delete/:titleId', controller.titlesController.deleteTitleById)

module.exports={
    titles:router
}