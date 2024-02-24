const express = require('express')
const app = express()
const router = express.Router()
const json = require('./mock.json')
const { createClient } = require('redis')

const client = createClient()

const connectRedis = async() => {

    await client.connect()
}
router.get('/', (req, res) => {
    client.get('jsonData').then((r) => {
        if (r) {
            console.log('isExist')
            res.json(JSON.parse(r))
        } else {
            console.log('notExist')
            res.json(json)
            client.set('jsonData', JSON.stringify(json)).then((v) => {
                console.log('v1', v)
            })

        }
    })
})
router.post('/', (req, res) => {
    const { username } = req.body
    client.set('createData', JSON.stringify(username)).then((v) => {
        console.log('v1', v)
        res.status(201).json({ username })
    })
})
router.get('/user', (req, res) => {
    client.get('createData').then((r) => {
        if (r) {
            console.log('isExist')
            res.json(JSON.parse(r))
        } else {
            console.log('notExist')
            res.json({ username: Date.now() })
            client.set('createData', JSON.stringify({ username: Date.now() })).then((v) => {
                console.log('v1', v)
            })

        }
    })
})
router.delete('/', (req, res) => {
    const newJson = json.filter((item) => item.id != 1)
    client.del('jsonData').then((r) => {
        console.log('r', r)
    })
    client.set('jsonData', JSON.stringify(newJson)).then((v) => {
        console.log('v1', v)
    })
    res.json({ id: 1 })
})

app.use(express.json())

app.use(router)

connectRedis().then(() => {
    app.listen(5000, () => {})
})