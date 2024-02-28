const utils = require('../utils/index')
const baseResponse = require('../dto/baseresponse.dto')
const companyService = require('../services/index')
const { StatusCodes } = require('http-status-codes')

exports.getAllCompany = (req, res) => { }

exports.getCompanyById = (req, res) => { }

exports.createCompany = async (req, res) => {
    const _response = { ...baseResponse } // clone the base response
    try {
        const json = await companyService.company.createCompany(req, res)
        res.json({ id:1 })


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

exports.updateCompany = (req, res) => { }

exports.deleteCompanyById = (req, res) => { }