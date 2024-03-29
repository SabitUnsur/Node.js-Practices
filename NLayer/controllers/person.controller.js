const personService = require('../services/index')
const { StatusCodes } = require('http-status-codes')
const baseResponse = require('../dto/baseresponse.dto')
const utils = require('../utils/index')

exports.signIn = async (req, res) => {
    try {
        const isInvalid = utils.helpers.handleValidation(req)
        if (isInvalid) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                ...baseResponse,
                ...isInvalid
            })
        }
        const json = await personService.person.signIn(req)
        res.status(StatusCodes.OK).json({ ...baseResponse, data: json, success: true, timestamp: Date.now(), code: StatusCodes.OK, message: ' Successfully logged in' })


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

exports.getAllPersons= async (req,res) => {
    try {
        const json = await personService.person.getAllList(req)
        res.status(StatusCodes.OK).json({ ...baseResponse, data: json, success: true, timestamp: Date.now(), code: StatusCodes.OK, message: 'successfully' })
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

exports.getAllPersonsWithPagination= async (req,res) => {
    try {
        const json = await personService.person.getAllListWithPagination(req)
        res.status(StatusCodes.OK).json({ ...baseResponse, data: json, success: true, timestamp: Date.now(), code: StatusCodes.OK, message: 'successfully' })
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

exports.getPersonById=async (req,res) => { 
    try {
        const isInvalid = utils.helpers.handleValidation(req)
        if (isInvalid) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                ...baseResponse,
                ...isInvalid
            })
        }
        const json = await personService.person.getPersonById(req)
        res.status(StatusCodes.OK).json({ ...baseResponse, data: json, success: true, timestamp: Date.now(), code: StatusCodes.OK, message: 'successfully' })


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

exports.createPerson= async (req,res) => {
    try {
        const isInvalid = utils.helpers.handleValidation(req)
        if (isInvalid) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                ...baseResponse,
                ...isInvalid
            })
        }
        const json = await personService.person.createPerson(req)
        res.status(StatusCodes.CREATED).json({ ...baseResponse, data: json, success: true, timestamp: Date.now(), code: StatusCodes.CREATED, message: 'Person created successfully' })


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

exports.updatePerson= async (req,res) => {
    try {
        const isInvalid = utils.helpers.handleValidation(req)
        if (isInvalid) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                ...baseResponse,
                ...isInvalid
            })
        }
        const json = await personService.person.updatePerson(req)
        res.status(StatusCodes.OK).json({ ...baseResponse, data: json, success: true, timestamp: Date.now(), code: StatusCodes.OK, message: 'Person updated successfully' })


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

exports.deletePersonById= async(req,res) => { 
        const _response = { ...baseResponse } 
        try {
            const isInvalid = utils.helpers.handleValidation(req)
            if (isInvalid) {
                return res.status(StatusCodes.BAD_REQUEST).json({
                    ...baseResponse,
                    ...isInvalid
                })
            }
            const json = await personService.person.deletePersonById(req)
            res.status(StatusCodes.OK).json({ ...baseResponse, data: json, success: true, timestamp: Date.now(), code: StatusCodes.OK, message: 'Person deleted successfully' })
    
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

exports.uploadAvatar = async (req, res) => {
    try {
        const isInvalid = utils.helpers.handleValidation(req)
        if (isInvalid) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                ...baseResponse,
                ...isInvalid
            })
        }
        const json = await personService.person.uploadAvatar(req)
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

exports.updateAvatar = async (req, res) => {
    try {
        const isInvalid = utils.helpers.handleValidation(req)
        if (isInvalid) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                ...baseResponse,
                ...isInvalid
            })
        }
        const json = await personService.person.updateAvatar(req)
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


exports.uploadCv = async (req, res) => {
    try {
        const isInvalid = utils.helpers.handleValidation(req)
        if (isInvalid) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                ...baseResponse,
                ...isInvalid
            })
        }
        const json = await personService.person.uploadCv(req)
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

exports.updateCv = async (req, res) => {
    try {
        const isInvalid = utils.helpers.handleValidation(req)
        if (isInvalid) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                ...baseResponse,
                ...isInvalid
            })
        }
        const json = await personService.person.updateCv(req)
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

exports.getCompanyByPersonId = async (req, res) => { 
    try {
        const isInvalid = utils.helpers.handleValidation(req)
        if (isInvalid) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                ...baseResponse,
                ...isInvalid
            })
        }
        const json = await personService.person.getCompanyByPersonId(req)
        res.status(StatusCodes.OK).json({ ...baseResponse, data: json, success: true, timestamp: Date.now(), code: StatusCodes.OK, message: 'successfully' })
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


exports.getTitleByPersonId = async (req, res) => { 
    try {
        const isInvalid = utils.helpers.handleValidation(req)
        if (isInvalid) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                ...baseResponse,
                ...isInvalid
            })
        }
        const json = await personService.person.getTitleByPersonId(req)
        res.status(StatusCodes.OK).json({ ...baseResponse, data: json, success: true, timestamp: Date.now(), code: StatusCodes.OK, message: 'successfully' })
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