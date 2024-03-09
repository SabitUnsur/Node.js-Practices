const { body,query, param} = require('express-validator')
const personService = require('../services/index')
const utils = require('../utils/index')


const PersonValidator = {
    validateCreatePerson() {
        return [
            body('name').not().isEmpty(),
            body('surname').not().isEmpty(),
            body('birthDate').isNumeric(),
            body('birthDate').not().equals(0),
            body('gender').not().isEmpty(),
            body('salary').isNumeric(),
            body('tcNumber').isNumeric().not().equals(0).isLength({ min: 11, max: 11 }).custom(async (value,{req})=>{
                const result = await utils.helpers.validateTcNumber(value)
                if (!result) {
                    throw new Error('Invalid TC number')
                }
                return true
            }),
            body('email').not().isEmpty().isEmail().custom(async(value,{req})=>{
                const result = await personService.person.findByEmail(value)
                if (result) {
                    throw new Error('E-mail already in use')
                }
                return true
            }),
            body('password').not().isEmpty(),
            body('password').isLength({ min: 8, max: 16 }),
            body('country').not().isEmpty(),
            body('city').not().isEmpty(),
            body('company').isMongoId(),
            body('title').isMongoId()
        ]
    },
    validateUploadAvatar() { 
        return [query('id').isMongoId()]
    },
    validateUploadCv() { 
        return [query('id').isMongoId()]
    },
    validateGetCompanyByPersonId() { 
        return [param('id').isMongoId()]
    },
    validateGetTitleByPersonId() { 
        return [param('id').isMongoId()]
    },
    validateGetPersonById(){
        return [param('id').isMongoId()]
    },
    validateListPagination(){ 
        return [
            query('perPage').isNumeric().not().equals(0),
            query('page').isNumeric(),
            query('sortBy').not().isNumeric().not().isEmpty(),
            query('sortDirection').not().isEmpty()
        ]
    },
    validateUpdatePerson(){
        return [
            body('name').not().isEmpty(),
            body('surname').not().isEmpty(),
            body('birthDate').isNumeric(),
            body('birthDate').not().equals(0),
            body('gender').not().isEmpty(),
            body('salary').isNumeric(),
            body('tcNumber').isNumeric().not().equals(0).isLength({ min: 11, max: 11 }).custom(async (value,{req})=>{
                const result = await utils.helpers.validateTcNumber(value)
                if (!result) {
                    throw new Error('Invalid TC number')
                }
                return true
            }),
            body('email').not().isEmpty().isEmail().custom(async(value,{req})=>{
                const result = await personService.person.findByEmail(value)
                if (result) {
                    throw new Error('E-mail already in use')
                }
                return true
            }),
            body('password').not().isEmpty(),
            body('password').isLength({ min: 8, max: 16 }),
            body('country').not().isEmpty(),
            body('city').not().isEmpty(),
            body('company').isMongoId(),
            body('title').isMongoId()
        ]
    },
    validateDeleteById(){
        return [query('id').isMongoId().withMessage('Invalid person id')]
    },
    validateUpdateCv(){ 
        return [query('id').isMongoId().withMessage('Invalid person id')]
    },
    validateUpdateAvatar(){
        return [query('id').isMongoId().withMessage('Invalid person id')]
    },
    validateSignIn(){
        return [
            body('email').not().isEmpty().isEmail(),
            body('password').not().isEmpty(),
            body('password').isLength({ min: 8, max: 16 })
        ]
    }
}

module.exports = PersonValidator