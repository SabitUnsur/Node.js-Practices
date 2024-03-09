const {body,query,param} = require('express-validator');

const CompanyValidator = { 
    validateCreateCompany(){
        return [body('name').not().isEmpty({ignore_whitespace: true}),body('description').not().isEmpty({ignore_whitespace: true}),body('year').isNumeric()]
    },
    validateUpdateCompany(){
        return [body('name').not().isEmpty({ignore_whitespace: true}),body('description').not().isEmpty({ignore_whitespace: true}),
        body('year').isNumeric(),param('id').isMongoId().withMessage('Invalid company id')]
    },
    validateUpdateLogo(){
        return [query('id').isMongoId().withMessage('Invalid company id')]
    },
    validateUploadLogo(){
        return [query('id').isMongoId().withMessage('Invalid company id')]
    },
    validateDeleteById(){
        return [query('id').isMongoId().withMessage('Invalid company id')]
    },
    validateFindById(){
        return [param('id').isMongoId().withMessage('Invalid company id')]
    },
    validateGetPersons(){
        return [param('id').isMongoId()]
    }
}

module.exports = CompanyValidator