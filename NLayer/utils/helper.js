const jwt = require('jsonwebtoken')
const logger = require('./logger')
const fs = require('fs')
const dns = require('dns')
const os = require('os')
const { validationResult } = require('express-validator')
const { StatusCodes } = require('http-status-codes')

const createToken = () => {
    const token = jwt.sign({
        userId: '',
        fullName: '',
        email: '',
    }, process.env.SECRET_KEY, {
        issuer: 'localhost',
        expiresIn: process.env.EXPIRESIN
    })
    return token
}

const verifyToken = (token) => {
    const isVerify = { decodedToken: null }
    try {
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY)
        isVerify.decodedToken = decodedToken
    } catch (error) {
        console.log(error)
    }
    return isVerify
}

const hashToPassword = (password) => {
    const md5 = require('md5')
    return md5(password)
}

const createUploadDir = (str) => {
    if (!fs.existsSync(str)) {
        fs.mkdirSync(str, { recursive: true })
    }
} // bu fonksiyonun amacı upload klasörünü oluşturmak

const getHost = () => {
    return new Promise((resolve, reject) => {
        dns.lookup(os.hostname(), (err, ip) => {
            if (err) {
                reject(err)
            } else {
                resolve(`http://${ip}:${process.env.PORT}`)
            }
        })
    })
}

const logToError = (err, req, message) => {
    logger.error(
    `IP Adresi : ${req.ip} 
    | PATH : ${req.path} 
    | BODY : ${JSON.stringify(req.body)} 
    | PARAMS : ${JSON.stringify(req.params)} 
    | QUERY : ${JSON.stringify(req.query)}
    | ERROR TIME : ${new Date().toLocaleString()}
    | URL : ${req.url} 
    | ERROR MESSAGE : ${err.message}
    | CUSTOM INFO : ${message}`)
}

const handleValidation = (req) => {
    const validationErrors = validationResult(req)
    if (validationErrors.isEmpty() === false) {
        return {
            message: "Invalid value",
            validationErrors: validationErrors.array(),
            success: false,
            error: true,
            timestamp: Date.now(),
            code: StatusCodes.BAD_REQUEST
        }
    }
    return null 
}

const deleteFromDisk = (fileName) =>{
    if(fileName && fs.existsSync(`uplaods/${fileName}`)){
        fs.unlinkSync(`uploads/${fileName}`, (err) => { 
            if (err) {
                return false
            }
            return true
        })
    }
    return true
}

const validateTcNumber = (value) =>{
    value = String(value)
    if (!(/^[1-9]\d{10}$/).test(value)) return false
    const digits = value.split('')

    const d10 = Number(digits[9])
    const d11 = Number(digits[10])

    let sumOf10 = 0
    let evens = 0
    let odds = 0
    
    digits.forEach((d, index) => {
        d = Number(d)
        if (index < 10) sumOf10 += d
        if (index < 9) {
            if ((index + 1) % 2 === 0) {
                evens += d
            } else {
                odds += d
            }
        }
    })
 
    if (sumOf10 % 10 !== d11) return false;
    if (((odds * 7) + (evens * 9)) % 10 !== d10) return false;
    if ((odds * 8) % 10 !== d11) return false;
    
    return true;
}

module.exports = {
    createToken,
    verifyToken,
    hashToPassword,
    logToError,
    createUploadDir,
    getHost,
    handleValidation,
    deleteFromDisk,
    validateTcNumber
}