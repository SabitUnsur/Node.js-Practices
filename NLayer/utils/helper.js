const jwt = require('jsonwebtoken')
const logger = require('./logger')
const fs = require('fs')
const dns = require('dns')
const os = require('os')

const createToken = () => { 
    const token = jwt.sign({ 
        userId: '',
        fullName: '',
        email: '',
     }, process.env.SECRET_KEY, {
        issuer:'localhost',
        expiresIn: process.env.EXPIRESIN
    })
    return token
}

const verifyToken = (token) => {
    const isVerify = {decodedToken : null}
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
    if (!fs.existsSync(str)){
        fs.mkdirSync(str, { recursive: true })
    }
}

const getHost = () => { 
    return new Promise((resolve, reject) => { 
        dns.lookup(os.hostname(), (err, ip) => { 
            if(err) { 
                reject(err)
            }else { 
                resolve(`http://${ip}:${process.env.PORT}`)
            }
        })
    })
}

const logToError=(err,req) => { 
    logger.error(`IP Adresi : ${req.ip} 
    | PATH : ${req.path} 
    | BODY : ${JSON.stringify(req.body)} 
    | PARAMS : ${JSON.stringify(req.params)} 
    | QUERY : ${JSON.stringify(req.query)}
    | ERROR TIME : ${new Date().toLocaleString()}
    | URL : ${req.url} 
    | ERROR MESSAGE : ${err.message}`)
}

 module.exports = {
    createToken,
    verifyToken,
    hashToPassword,
    logToError,
    createUploadDir,
    getHost
}