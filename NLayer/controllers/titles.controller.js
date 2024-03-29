const utils = require('../utils/index')
const baseResponse = require('../dto/baseresponse.dto')
const { StatusCodes } = require('http-status-codes')
const titleService = require('../services/index')

exports.getAllTitles= async (req,res) => {
    try {
        const json = await titleService.title.listTitles()
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

exports.getPersonsByTitleId= async (req,res) => { 
    try {
        const isInvalid = utils.helpers.handleValidation(req)
        if (isInvalid) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                ...baseResponse,
                ...isInvalid
            })
        }
        const json = await titleService.title.getPersonsByTitleId(req)
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


exports.getTitleById= async(req,res) => {   
        try {
            const isInvalid = utils.helpers.handleValidation(req)
            if (isInvalid) {
                return res.status(StatusCodes.BAD_REQUEST).json({
                    ...baseResponse,
                    ...isInvalid
                })
            }
            const json = await titleService.title.getTitleById(req)
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

exports.createTitle= async (req,res) => { 
        try {
            const isInvalid = utils.helpers.handleValidation(req)
            if (isInvalid) {
                return res.status(StatusCodes.BAD_REQUEST).json({
                    ...baseResponse,
                    ...isInvalid
                })
            }
            const json = await titleService.title.createTitle(req)
            res.status(StatusCodes.CREATED).json({ ...baseResponse, data: json, success: true, timestamp: Date.now(), code: StatusCodes.CREATED, message: 'Title created successfully' })
    
    
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

exports.updateTitle= async (req,res) => {
    try {
        const isInvalid = utils.helpers.handleValidation(req)
        if (isInvalid) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                ...baseResponse,
                ...isInvalid
            })
        }
        const json = await titleService.title.updateTitle(req)
        res.status(StatusCodes.CREATED).json({ ...baseResponse, data: json, success: true, timestamp: Date.now(), code: StatusCodes.CREATED, message: 'Title updated successfully' })
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

exports.deleteTitleById= async (req,res) => { 
    try {
        const isInvalid = utils.helpers.handleValidation(req)
        if (isInvalid) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                ...baseResponse,
                ...isInvalid
            })
        }
        const json = await titleService.title.deleteTitleById(req)
        res.status(StatusCodes.OK).json({ ...baseResponse, data: json, success: true, timestamp: Date.now(), code: StatusCodes.OK, message: 'Company deleted successfully' })


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