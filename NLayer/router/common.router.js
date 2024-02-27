const express = require('express')
const router = express.Router()
const controller = require('../controllers/index')

router.get('/allCountry', controller.commonController.getAllCountry)
router.get('/cityById/:countryId', controller.commonController.getCityByCountryId)


module.exports={
    common:router
}