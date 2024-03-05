const {body} = require('express-validator');

const TitleValidator = { 
    validateCreateTitle(){
        return [body('name').not().isEmpty({ignore_whitespace: true})]
    }
}

module.exports = TitleValidator