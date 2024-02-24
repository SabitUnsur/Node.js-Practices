const { connectMongoDb } = require('./db')
const express = require('express')
const app = express()
const router = express.Router()
const Animal = require('./animal')
const Country = require('./country')
const Team = require('./teams')

app.use(express.json())
app.use(router)

connectMongoDb().then(() => {
    app.listen(3000, () => {
        console.log('Server is running on port 3000')
    })
}).catch((error) => {
    console.log('Server is not running')
})

router.get('/listAllAnimals', (req, res) => {
    Animal.find({}, 'family').then((docs) => {
        res.json(docs)
    })
})

router.get('/getAnimalById/:id', (req, res) => {
    Animal.findById(req.params.id).then((doc) => {
        res.json(doc)
    })
})

router.get('/getAnimalByName/', (req, res) => {
    Animal.findByAnimalName(req.query.name).then((doc) => {
        res.json(doc)
    })
})

router.get('/getAnimalByFamily/', (req, res) => {
    Animal.find().byFamily(req.query.family).then((doc) => {
        res.json(doc)
    })
})

router.post('/addAnimal', (req, res) => {
    const { name, family, age, live_area } = req.body
    const animal = new Animal({
        name,
        family,
        age,
        live_area
    })
    animal.save().then((result) => {
        res.json(result)
    }).catch((error) => {
        res.json(error)
    })
})

router.post('/addAnimals', (req, res) => {
    const { data } = req.body
    const animalArr = []
    for (let index = 0; index < data.length; index++) {
        animalArr.push(new Animal({
            name: data[index].name,
            family: data[index].family,
            age: data[index].age,
            live_area: data[index].live_area
        }))
    }

    Animal.insertMany(animalArr).then((result) => {
        res.json(result)
    }).catch((error) => {
        res.json(error)
    })
})

router.get('/getAllAnimalsWithPagination', (req, res) => {
    const { limit, skip } = req.query
    Animal.find().select('family name live_area').limit(parseInt(limit)).skip(parseInt(skip)).sort({
        [req.query.sortBy]: req.query.sortOrder //ascending or descending oldugunu belirtebiliriz
    }).then((docs) => {
        res.json(docs)
    })
})

router.post('/createAnimalWithValidation', (req, res) => {
    const { name, family, age, live_area } = req.body
    const animal = new Animal({
        name,
        family,
        age,
        live_area
    })
    const errors = animal.validateSync()
    if (errors) {
        res.json(errors)
    } else {
        animal.save().then((result) => {
            res.status(201).json(result)
        })
    }
})

router.put('/updateAnimal/:id', (req, res) => {
    Animal.findByIdAndUpdate({ _id: req.query.id }, {
        name: req.body.name
    }).then((result) => {
        res.status(200).json(result)
    })
})

router.delete('/deleteAnimal/:id', (req, res) => {
    Animal.findByIdAndDelete(req.params.id).then((result) => {
        res.status(200).json(result)
    })
})

router.post('/createRelation', (req, res) => {
    const country = new Country({
        name: "Türkiye"
    })

    country.save().then((result) => {

        const team = new Team({
            name: "Fenerbahçe",
            team_year: new Date().getFullYear() - 1907,
            countryId: result._id
        })

        team.save().then((result) => {
            country.teams.push(result)
            country.save().then((result) => {
                res.json(result)
            })
        })
    })
})

router.get('/getCountryWithTeams', (req, res) => {
    Country.find().populate({
        path: 'teams',
        select: 'name team_year',
        match: {
            name: 'Fenerbahçe'
        }
    }).then((result) => {
        res.json(result)
    }) //populate ile ilişkili tablodaki verileri çekebiliriz inner join gibi düşünebiliriz
 })

 router.put('/updateCountryWithTeam/:id', (req, res) => {
    Country.findById(req.params.id).then((result) => {
        result.teams[0].name = req.body.name
        result.save().then((result) => {
            res.json(result)
        })
    })
})


const test = async() => {
    const country = await Country.findById('65d70102a32d4ebe4afa13f3')
    Team.deleteMany({ countryId: country._id }).then((r) => {
        console.log('r', r)
        Country.findByIdAndDelete(country._id).then((r) => {
            console.log('r', r)
        })
    })
    console.log(country.teams)

}
test()



