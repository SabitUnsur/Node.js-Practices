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
      utils.helpers.logToError(error)
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
      const _response = { ...baseResponse }
      const validationErrors = validationResult(req)
      if (validationErrors.isEmpty() === false) {
         res.status(StatusCodes.BAD_REQUEST).json({
            ..._response,
            success: false,
            error: true,
            timestamp: Date.now(),
            code: StatusCodes.BAD_REQUEST,
            message: "Invalid value",
            validationErrors: validationErrors.array(),
         })
      }
      const json = commonService.getCityByCountryId(countryId)
      res.json({
         ..._response,
         data: json,
         success: true,
         error: false,
         timestamp: Date.now(),
         code: StatusCodes.OK
      })
   } catch (error) {
      utils.helpers.logToError(error)
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