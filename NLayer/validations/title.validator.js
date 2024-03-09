const {body,param,query} = require('express-validator');

const TitleValidator = { 
    validateCreateTitle(){
        return [body('name').not().isEmpty({ignore_whitespace: true})]
    },
    validateFindById(){
        return [param('id').isMongoId()]
    },
    validateUpdateTitle(){
        return [param('id').isMongoId().withMessage('Invalid ID'),body('name').not().isEmpty({ignore_whitespace: true}).withMessage('Name is required')]
    },
    validateDeleteById(){
        return [query('id').isMongoId().withMessage('Invalid title id')]
    },
    validateGetPersonsById(){
        return [param('id').isMongoId().withMessage('Invalid title id')]
    }
}

module.exports = TitleValidator