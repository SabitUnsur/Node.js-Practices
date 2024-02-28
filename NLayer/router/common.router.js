const express = require('express')
const router = express.Router()
const controller = require('../controllers/index')
const commonValidator = require('../validations/index')
router.get('/allCountry', controller.commonController.getAllCountry)
router.get('/cityById/:countryId', [commonValidator.commonValidator.validateCountryById()] ,controller.commonController.getCityByCountryId)


module.exports={
    common:router
}