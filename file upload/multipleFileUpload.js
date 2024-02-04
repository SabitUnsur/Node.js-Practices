const multer = require('multer')
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        //  console.log('destination', file)
        cb(null, 'uploads')
    },
    filename: function(req, file, cb) {
        // console.log('filename', file)
        cb(null, file.fieldname + '_' + Date.now() + '_' + '_' + 'Multer' + file.originalname)
    }

})

const fileFilter = (req, file, cb) => {
        if (file.mimetype.includes('image')) {
            cb(null, true)
        } else {
            cb(new multer.MulterError(300, file.originalname), false)
        }

        //console.log('fileFilter', file) 
        //!dosya tipi kontrolü
    }
    //multiple ?
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
})
module.exports = upload