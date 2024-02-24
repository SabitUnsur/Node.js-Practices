const express = require('express')
const router = express.Router()
const MyLogger = require('./logger')
const Logger = new MyLogger()

app.use(router)
app.use(express.json())

app.listen(3000, () => {
    console.log('Server is running on port 3000')
})

const data = []

router.get('/', (req, res) => {
    try {
        Logger.LogInfo(`${req.ip} adresinden ${req.path} endpointine istek geldi.`)
        res.json(data)
    } catch (error) {
        Logger.LogError(`${req.ip} adresinden ${req.path} endpointine istek basarisiz.`)
    }
})

router.post('/', (req, res) => {
    const { name } = req.body
    try {
        const item = { name: name.toUpperCase(), id: Date.now() }
        data.push(item)
        Logger.LogInfo(`${req.ip} adresinden ${req.path} endpointine istek geldi. ${name} adli veri eklendi.`)
        res.status(201).json(item)
    } catch (error) {
        Logger.LogError(`${req.ip} adresinden ${req.path} endpointine istek basarisiz. ${name} adli veri eklenirken bir hata olustu.`)
    }
})