const express = require('express')
const app = express()
app.use(express.json())
const router = express.Router()
app.use(router)

const swaggerUI = require('swagger-ui-express')
const swaggerDocument = require('./swagger.json')

const myData= [
    {
        id:1,
        team: 'Fenerbahce',
    },
    {
        id:2,
        team: 'Liverpool',
    },
    {
        id:3,
        team: 'Arsenal',
    },
    {
        id:4,
        team: 'Real Madrid',
    }
]

router.use('/api-docs',swaggerUI.serve, swaggerUI.setup(swaggerDocument))

router.get('/list', (req, res) => {
    res.json(myData)
})

router.post('/create', (req, res) => {
    const {team} = req.body
    const _team = {team,id: myData.length + 1}
    myData.push(_team) 
    res.status(201).json(_team) })


router.delete('/delete/:id', (req, res) => {
    const {id} = req.params
    const _team = myData.find(team => team.id == id)
    myData.splice(myData.indexOf(_team),1)
    res.json({message: 'Record deleted'})

})


router.put('/update/:id', (req, res) => {
    const {id} = req.params
    const {team} = req.body
    const _team = myData.find(team => team.id == id)
    _team.team = team
     res.json(_team)
})

app.listen(3000, () => {
    console.log('Server is running on port 3000')
})