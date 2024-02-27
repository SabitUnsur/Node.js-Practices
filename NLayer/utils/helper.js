const jwt = require('jsonwebtoken')

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

 module.exports = {
    createToken,
    verifyToken,
    hashToPassword
}