const db = require('./db')
const express = require('express')
const app = express()
const router = express.Router()



app.use(express.json())
app.use(router)
app.listen(5000, async () => {
    await db.connect()
    //await db.CreateTables()
})

const Actor_Movie = require('./models/actor-movie-model')
const Actor = require('./models/actor-model')
const Movie = require('./models/movie-model')

Actor.belongsToMany(Movie, { through: Actor_Movie, foreignKey: 'actor_id' })
Movie.belongsToMany(Actor, { through: Actor_Movie, foreignKey: 'movie_id' })

const Test = require('./models/test-model')
const User = require('./models/user-model')
const Socials = require('./models/social-model')
const { Op } = require('sequelize')

User.hasMany(Socials, { foreignKey: 'user_id' })
Socials.belongsTo(User)


router.post('/ManyToMany', async (req, res) => {
    const { actor_name, movie_name } = req.body
    try {
        const actor = await Actor.create({ actor_name })
        const movie = await Movie.create({ movie_name })
        const result = await actor.addMovie(movie)
        res.status(201).json(result)
    } catch (error) {
        res.status(500).json(error)
    }
})

router.get('/manyToManyGetMovieWithActor/:dataId', async (req, res) => { 
    const dataId = req.params.dataId
    const actor = await Actor.findByPk(dataId)
    const result = await actor.getMovies()
    res ? res.status(200).json(result) : res.status(500).json(error)
 })

router.get('/manyToManyGetMovieWithActors/:dataId', async (req, res) => {
    const dataId  = req.params.dataId
    const movie = await Movie.findByPk(dataId)
    const result = await movie.getActors() 
    res ? res.status(200).json(result) : res.status(500).json(error)
})


router.get('/manyToManyGetMovieWithActorCount/:dataId', async (req, res) => { 
    const dataId = req.params.dataId
    const actor = await Actor.findByPk(dataId)
    const result = await actor.countMovies()
    res ? res.status(200).json(result) : res.status(500).json(error)
 })


router.delete('/manyToManyRemoveRelation/:dataId/:movieId', async (req, res) => { 
    const dataId = req.params.dataId
    const movieId = req.params.movieId
    const actor = await Actor.findByPk(dataId)
    const movie = await Movie.findByPk(movieId)
    const result = await actor.removeMovie(movie)
    res ? res.status(200).json(result) : res.status(500).json(error)
})


router.get('/manyToManyListDataForActor/:dataId',async (req, res) => {
    const dataId = req.params.dataId
    const data = await Actor.findAll({
        where: { id: dataId },
        include: [{
            model: Movie,
            attributes: ['movie_name'],
        }]
    })
    res ? res.status(200).json(data): res.status(500).json(error)
})

router.post('/createData', async (req, res) => {
    // const test = new TestModel({
    //     testAd: 'Sevinç',
    //     testSoyad: 'Bulatoğlu'
    // })
    // test.validate().then((result) => {
    //     console.log(result)
    // }).catch((err) => {
    //     console.log(err)
    // }) //validate işlemi yapar ve sonucu döndürür. Hata varsa hata mesajını döndürür.

    const { testAd, testSoyad } = req.body

    try {
        //const res = await test.save({logging: true})
        const testData = await Test.create({
            testAd,
            testSoyad
        }, { logging: true, validate: true }) //2. yol validate için 
        res.status(201).json(testData)
    } catch (error) {
        res.status(500).json(error)
    }
})


router.get('/getAllData', async (req, res) => {
    try {
        const response = await Test.findAll({ where: { attribute: ['testAd, testSoyad'] } })
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json(error)
    }
})


router.delete('/deleteData/:id', async (req, res) => {
    const id = req.params.id
    try {
        //const findedData = await TestModel.findByPk(id)
        const findedData = await Test.findOne({ where: { id: id } })
        const response = await findedData.destroy({ logging: true, force: true })
        res.status(201).json(response)
    } catch (error) {
        console.log(error)
    }
})

router.post('/createMultiple', async (req, res) => {
    const data = req.body
    try {
        const response = await Test.bulkCreate(data)
        res.status(201).json(response)
    } catch (error) {
        res.status(500).json(error)
    }
})


router.post('/findOrCreate', async (req, res) => {
    const { testAd, testSoyad } = req.body
    try {
        const [data, isCreated] = await Test.findOrCreate({
            where: { testAd },
            defaults: { testAd, testSoyad }
        })
        res.status(201).json({ isExist: true, ...data })
    } catch (error) {
        res.status(500).json(error)
    }
})

router.put('/updateData/:id', async (req, res) => {
    const id = req.params.id
    const { testAd, testSoyad } = req.body
    try {
        const findedData = await Test.findByPk(id)
        const response = await findedData.update({ testAd, testSoyad })
        res.status(201).json(response)
    } catch (error) {
        console.log(error)
    }
})

router.get('/getOneData/:id', async (req, res) => {
    const id = req.params.id
    try {
        const response = await Test.findByPk(id)
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json(error)
    }
})


router.get('/getOneDataWithPagination', async (req, res) => {
    const { Limit, Offset } = req.query //query çalıştırdık çünkü parametre olarak değil query olarak gönderdik
    const response = await Test.findAndCountAll({
        limit: Number(Limit),
        offset: Number(Offset)
    })
    res.status(200).json(response)
})


router.get('/getQuerySequelize/:id', async (req, res) => {
    const dataId = req.params.id
    const response = await db.sequelize.query('SELECT * FROM test WHERE test_id = :test_id', {
        replacements: { test_id: dataId },
        type: db.sequelize.QueryTypes.SELECT,
    })
    res.status(200).json(response)
})


router.get('/getFilterData', async (req, res) => {
    const response = await Test.findAll({
        where: {
            testAd: {
                [Op.startsWith]: 'S'
            }
        }
    })
    res.status(200).json(response)
})


router.post('/createDataWithTransaction', async (req, res) => {
    const { testAd, testSoyad } = req.body
    const transaction = await db.sequelize.transaction()
    try {
        const res = await Test.create({
            testAd,
            testSoyad
        }, { logging: true, validate: true, transaction: transaction })
        await transaction.commit()
        res.status(201).json(res)
    } catch (error) {
        await transaction.rollback()
        res.status(500).json(error)
    }
})


//Virtuals-Getter-Setter 
//Virtuals: Veritabanında olmayan ancak modelde tanımlanan alanlardır.
//Getter: Veritabanından çekilen verileri değiştirmek için kullanılır.
//Setter: Veritabanına kaydedilecek verileri değiştirmek için kullanılır.

router.post('/createDataWithRelational', async (req, res) => {
    // const user = await User.create({ 
    //     username : 'sabit'
    // },{logging: true})

    const user = await User.findByPk(1)
    const socialMedia = await Socials.find

    const data = await user.getSocials()
    const count = await user.countSocials()
    console.log(count)
    const social = await Socials.create({ SocialMediaName: 'Facebook' })
    const social2 = await Socials.create({ SocialMediaName: 'Instagram' })
    await user.addSocial([social, social2])

    // await user.createSocial({
    //     SocialMediaName: 'Pinterest'
    // })

    //const social = await Socials.create({SocialMediaName: 'Twitter'})
    // const userWithSocial =  await user.addSocial(social);
    // addSocial: ilişkili tabloya veri eklemek için kullanılır. iliski tanımlı oldugu icin bu metot otomatik olarak olusur.
    //  console.log(userWithSocial)
})


router.get('/getUserWithSocials', async (req, res) => {
    const data = await User.findAll({
        include: [{
            model: Socials,
            attributes: ['SocialMediaName'],
            where: {
                social_media_name: {
                    [Op.in]: ['Facebook', 'Twitter']
                }
            }
        }]
    })
    res.status(200).json(data)
})