const {body,param,query} = require('express-validator')

const validateUser = () => {
    return [
        body('username').isLength({min:5}).withMessage('Username should be at least 5 characters'),
        body('password').isLength({min:5}).withMessage('Password should be at least 5 characters')
        .notEmpty({ignore_whitespace:true}).withMessage((value,{req,location,path})=>{
            return {value,location,path}
        }).custom((value,{req}) =>{
            //kendi custom validation fonksiyonumuzu yazdık, ornek son 3 aydaki parolan aynı olamaz gibi kontroller
            if(value !== req.body.confirmPassword){
                throw new Error('Password and Confirm Password should be the same')
            }
            return true
        
        })
    ]
}

const validateGetUserById = () => {
    return [
        param('userId').isInt().withMessage('User Id should be an integer')
    ]
}

const validateQuery = () => {
    return [
        query('limit').notEmpty().withMessage('Limit should not be empty'),
    ]
}

module.exports = {validateUser,validateGetUserById,validateQuery}