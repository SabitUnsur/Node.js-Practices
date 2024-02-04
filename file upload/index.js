const express = require('express')
const app = express()
const fs = require('fs')
const singleFileUpload = require('./singleFileUpload')
const multipleFileUpload = require('./multipleFileUpload')
const differentFieldsFileUpload = require('./differentFieldsUpload')
const anyFileUpload = require('./anyUpload')
const memoryStorageUpload = require('./memoryStorageUpload')
const multer = require('multer')
app.use(express.json())

const router = express.Router()

router.get('/', (req, res) => {
    res.send('Merhaba')
})

if (!fs.existsSync('./uploads')) {
    fs.mkdirSync('./uploads')
}
router.post('/fileUpload', (req, res) => {
    
    singleFileUpload(req, res, (err) => {
        console.log('body', req.body)
        if (err) {
            res.json(err)
        }
        console.log(req.file)
    })
    console.log(req.body, req.file)
})

const _upload = multipleFileUpload.array('dosyalar', 5)
router.post('/multiplefileUpload', (req, res) => {
    console.log('multiplefileupload', req.body, req.files)
    _upload(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            console.log('multererr', err)
            res.json(err)
        } else {
            console.log('hataaa', err)
        }
        if (err) {
            res.send('Hata var')
        } else {
            res.send('okey')
        }
    })
})

router.post('/differentFieldsFileUpload', (req, res) => {

    differentFieldsFileUpload(req, res, (err) => {
        console.log('body', req.body)
        if (err) {
            res.json(err)
        }
        console.log(req.files)
    })
    console.log(req.body, req.files)
})

router.post('/anyFileUpload', (req, res) => {

    anyFileUpload(req, res, (err) => {
        console.log('body', req.body)
        if (err) {
            res.json(err)
        }
        console.log(req.files)
    })
    console.log(req.body, req.files)
})

router.post('/memoryStorageUpload', (req, res) => {

    memoryStorageUpload(req, res, (err) => {
        console.log('body', req.body)
        if (err) {
            res.json(err)
        }
        console.log(req.files)
    })
    console.log(req.body, req.files)
})

app.use(router)

app.listen(5000)