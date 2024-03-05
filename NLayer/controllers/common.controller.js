const baseResponse = require('../dto/baseresponse.dto')
const commonService = require('../services/common.service')
const { StatusCodes } = require('http-status-codes')
const utils = require('../utils/index')
const { validationResult } = require('express-validator')

exports.getAllCountry = (req, res) => {
   try {
      const _response = { ...baseResponse } // clone the base response
      const json = commonService.getAllCountries(req, res)
      res.json({..._response, //ilk parametredeki objenin içindeki tüm özellikleri alır
         data: json,
         success: true,
         error: false,
         timestamp: Date.now(),
         code: StatusCodes.OK
      })
   } catch (error) {
      baseResponse.error = true
      baseResponse.data = null
      baseResponse.success = false
      baseResponse.timestamp = Date.now()
      baseResponse.code = StatusCodes.INTERNAL_SERVER_ERROR
      baseResponse.message = error.message
      utils.helpers.logToError(error,req)
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
         ..._response,
         error: true,
         success: false,
         error: false,
         timestamp: Date.now(),
         code: StatusCodes.INTERNAL_SERVER_ERROR,
         message: error.message
      })
   }
}

exports.getCityByCountryId = (req, res) => {
   try {
      const { countryId } = req.params
      const isInvalid = utils.helpers.handleValidation(req)
        if (isInvalid) {
         return res.status(StatusCodes.BAD_REQUEST).json({
                ...baseResponse,
                ...isInvalid
            })
        }
      const json = commonService.getCityByCountryId(countryId)
      res.json({
         ...baseResponse,
         data: json,
         success: true,
         timestamp: Date.now(),
         code: StatusCodes.OK
      })
   } catch (error) {
      utils.helpers.logToError(error)
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
         ...baseResponse,
         error: true,
         success: false,
         error: false,
         timestamp: Date.now(),
         code: StatusCodes.INTERNAL_SERVER_ERROR,
         message: error.message
      })
   }
}