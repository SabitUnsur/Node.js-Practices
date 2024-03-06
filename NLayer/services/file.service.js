const utils = require('../utils/index')
const upload = require('../middleware/singleimageupload.middleware')
const multer = require('multer')
const uploadCv = require('../middleware/singlecvupload.middleware')


exports.uploadImage = async (req) => {
   return new Promise ((resolve, reject) => { 
    upload(req, async (err)=>{ 
        if(err instanceof multer.MulterError){
            reject(err)
        }
        else if(err){
            reject(err)
        }
        const ip = await utils.helpers.getHost()
        const filePath = process.env.FILE_PATH
        const fileName = req.file.filename
        const fileString = `${ip}${filePath}${fileName}`
        resolve(fileString)
    })
   }) 
}

exports.uploadCv = async (req) => {
    return new Promise ((resolve, reject) => { 
        uploadCv(req, async (err)=>{ 
         if(err instanceof multer.MulterError){
             reject(err)
         }
         else if(err){
             reject(err)
         }
         const ip = await utils.helpers.getHost()
         const filePath = process.env.FILE_PATH
         const fileName = req.file.filename
         const fileString = `${ip}${filePath}${fileName}`
         resolve(fileString)
     })
    }) 
 }

