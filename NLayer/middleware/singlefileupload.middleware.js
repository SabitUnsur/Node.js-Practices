const multer = require('multer')
const mimeTypes = require('../consts/index')
const e = require('express')

const storage = multer.diskStorage({ 
    destination: (req, file, cb) => { 
        cb(null, './uploads')
    }, 
    filename: (req, file, cb) => {
        const randomName = `${Date.now()}_${Math.round(Math.random() * 1E9)}_${file.fieldname}_${file.originalname}`
        cb(null, randomName)
     } 
})

const fileFilter = (req, file, cb) => { 
    if(mimeTypes.general.IMAGE_MIME_TYPES.includes(file.mimetype)) {
        cb(null, true)
        return
    }else {
        cb(new Error('Unsupported file type'), false)
    }
}

const upload = multer({ storage, fileFilter, limits: { fileSize: "5MB" } }).single('image') // single parametresi formdaki inputun name değerini alır


module.exports = upload 