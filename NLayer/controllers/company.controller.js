const utils = require('../utils/index')
const baseResponse = require('../dto/baseresponse.dto')
const companyService = require('../services/index')
const { StatusCodes } = require('http-status-codes')

exports.getAllCompany = async (req, res) => {
    try {
        const json = await companyService.company.listCompany()
        res.status(StatusCodes.CREATED).json({ ...baseResponse, data: json, success: true, timestamp: Date.now(), code: StatusCodes.CREATED, message: 'listed successfully' })


    } catch (error) {
        utils.helpers.logToError(error, req)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            ...baseResponse,
            error: true,
            success: false,
            timestamp: Date.now(),
            code: StatusCodes.INTERNAL_SERVER_ERROR,
            message: error.message
        })
    }
}

exports.getCompanyById = async (req, res) => {
    try {
        const isInvalid = utils.helpers.handleValidation(req)
        if (isInvalid) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                ...baseResponse,
                ...isInvalid
            })
        }
        const json = await companyService.company.getCompanyById(req)
        res.status(StatusCodes.OK).json({ ...baseResponse, data: json, success: true, timestamp: Date.now(), code: StatusCodes.OK, message: 'success' })
    } catch (error) {
        utils.helpers.logToError(error, req)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            ...baseResponse,
            error: true,
            success: false,
            timestamp: Date.now(),
            code: StatusCodes.INTERNAL_SERVER_ERROR,
            message: error.message
        })
    }
}

exports.createCompany = async (req, res) => {
    const _response = { ...baseResponse } // clone the base response
    try {
        const isInvalid = utils.helpers.handleValidation(req)
        if (isInvalid) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                ...baseResponse,
                ...isInvalid
            })
        }
        const json = await companyService.company.createCompany(req)
        res.status(StatusCodes.CREATED).json({ ...baseResponse, data: json, success: true, timestamp: Date.now(), code: StatusCodes.CREATED, message: 'Company created successfully' })


    } catch (error) {
        utils.helpers.logToError(error, req)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            ..._response,
            error: true,
            success: false,
            timestamp: Date.now(),
            code: StatusCodes.INTERNAL_SERVER_ERROR,
            message: error.message
        })
    }
}

exports.updateCompany = async (req, res) => {
    try {
        const isInvalid = utils.helpers.handleValidation(req)
        if (isInvalid) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                ...baseResponse,
                ...isInvalid
            })
        }
        const json = await companyService.company.updateCompany(req)
        res.status(StatusCodes.OK).json({ ...baseResponse, data: json, success: true, timestamp: Date.now(), code: StatusCodes.CREATED, message: 'Company updated successfully' })


    } catch (error) {
        utils.helpers.logToError(error, req)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            ...baseResponse,
            error: true,
            success: false,
            timestamp: Date.now(),
            code: StatusCodes.INTERNAL_SERVER_ERROR,
            message: error.message
        })
    }
 }


exports.deleteCompanyById = async (req, res) => {
    const _response = { ...baseResponse } // clone the base response
    try {
        const isInvalid = utils.helpers.handleValidation(req)
        if (isInvalid) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                ...baseResponse,
                ...isInvalid
            })
        }
        const json = await companyService.company.deleteCompanyById(req)
        res.status(StatusCodes.OK).json({ ...baseResponse, data: json, success: true, timestamp: Date.now(), code: StatusCodes.OK, message: 'Company deleted successfully' })


    } catch (error) {
        utils.helpers.logToError(error, req)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            ..._response,
            error: true,
            success: false,
            timestamp: Date.now(),
            code: StatusCodes.INTERNAL_SERVER_ERROR,
            message: error.message
        })
    }
}

exports.uploadLogo = async (req, res) => {
    try {
        //Geçersiz veride dosya eklenmemeli. Bu asenkron probleminden dolayı oluşuyor.
        const isInvalid = utils.helpers.handleValidation(req)
        if (isInvalid) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                ...baseResponse,
                ...isInvalid
            })
        }
        const json = await companyService.company.uploadLogo(req)
        res.status(StatusCodes.OK).json(json)
    } catch (error) {
        utils.helpers.logToError(error, req)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            ...baseResponse,
            error: true,
            success: false,
            timestamp: Date.now(),
            code: StatusCodes.INTERNAL_SERVER_ERROR,
            message: error.message
        })
    }
}

exports.updateLogo = async (req, res) => { 
    try {
        //Geçersiz veride dosya eklenmemeli. Bu asenkron probleminden dolayı oluşuyor.
        const isInvalid = utils.helpers.handleValidation(req)
        if (isInvalid) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                ...baseResponse,
                ...isInvalid
            })
        }
        const json = await companyService.company.updateLogo(req)
        res.status(StatusCodes.OK).json(json)
    } catch (error) {
        utils.helpers.logToError(error, req)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            ...baseResponse,
            error: true,
            success: false,
            timestamp: Date.now(),
            code: StatusCodes.INTERNAL_SERVER_ERROR,
            message: error.message
        })
    }
}