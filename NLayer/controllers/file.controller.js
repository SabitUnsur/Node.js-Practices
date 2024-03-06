const utils = require('../utils/index')
const baseResponse = require('../dto/baseresponse.dto')
const { StatusCodes } = require('http-status-codes')
const upload = require('../middleware/singlefileupload.middleware')
const multer = require('multer')



exports.uploadImage = async (req, res) => {
    const _response = { ...baseResponse } // clone the base response
    try {
        upload(req,res, async (err)=>{ 
            if(err instanceof multer.MulterError){
                utils.helpers.Error(err,req, req.file ? req.file.filename : '')    
                 res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                    ..._response,
                    error: true,
                    success: false,
                    timestamp: Date.now(),
                    code: StatusCodes.INTERNAL_SERVER_ERROR,
                    message: err.message
                })
                return
            }else if(err){
                utils.helpers.logToError(err,req,req.file ? req.file.filename : '')
                res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                    ..._response,
                    error: true,
                    success: false,
                    timestamp: Date.now(),
                    code: StatusCodes.INTERNAL_SERVER_ERROR,
                    message: err.message
                })
            }
            res.status(StatusCodes.CREATED).json({message: 'success'})
        })

    } catch (error) {
        utils.helpers.logToError(error)
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

