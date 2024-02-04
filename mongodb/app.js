const express = require('express')
const app = express()
const router = express.Router()
const connection = require('./db')
let mydb;
const ObjectId = require('mongodb').ObjectId;


router.get('/listAllAuthors', (req, res) => {
    mydb.collection('authors').find({}).toArray().then((r) => {
        res.json(r)
    })
})

router.post('/createAuthor', (req, res) => {
    const { name, surname, books } = req.body
    mydb.collection('authors').insertOne({
        name,
        surname,
        books
    }).then((r) => {
        res.status(201).json({ _id: r.insertedId, name, surname, books })
            // mydb.collection('authors').findOne({
            //     _id: r.insertedId
            // }).then((result) => {
            //     res.status(201).json(result)
            // })
    })
})

router.get('/findAuthorByName', (req, res) => {
    mydb.collection('authors').findOne({
        name: req.query.name
    }).then((r) => {
        res.json(r)
    })
})

router.post('/createMultipleAuthor', (req, res) => {
    const { data } = req.body
    mydb.collection('authors').insertMany(data).then((r) => {
        res.status(201).json(r)
    })
})


router.get('/listAuthorWithPagination', (req, res) => {
    mydb.collection('authors').find({}).skip(Number(req.query.skip)).limit(Number(req.query.limit)).toArray((err, r) => {
        res.status(200).json(r)

    })
})

router.get('/listAuthorWithSoryByName', (req, res) => {
    mydb.collection('authors').find({}).sort({ name: Number(req.query.order) }).toArray((err, r) => {
        res.status(200).json(r)
    })
})


router.delete('/deleteAuthorById/:authorId', (req, res) => {
    mydb.collection('authors').deleteOne({
        _id: new ObjectId(req.params.authorId)
    }, (err, r) => {
        res.status(200).json(r)
    })
})

router.delete('/deleteAuthorsMultiple', (req, res) => {

    // mydb.collection('authors').deleteMany({
    //     name: 'Franz'
    // }, (err, res) => {
    //     console.log('err', err)
    //     console.log('res', res)
    // })
})

router.put('/updateAuthorById/:authorId', async(req, res) => {
    const { name } = req.body
    const { authorId } = req.params
    mydb.collection('authors').updateOne({ _id: new ObjectId(authorId) }, {
        $set: {
            name,
        }
    }).then((r) => {
        console.log('r', r)
        res.status(200).json(r)
    })
})
router.put('/updateMany', (req, res) => {
    // mydb.collection('authors').updateMany({ name: 'Oguz' }, {
    //     $set: {
    //         name: 'Oğuz',
    //         surname: 'Atay'
    //     }
    // }).then((r) => {
    //     console.log('r', r)
    // })
})

app.use(express.json())
app.use(router)


connection.createConnection().then((db) => {
    mydb = db
    app.listen(5000, () => {
        console.log('Running on port 5000')
    })
})





//https://www.mongodb.com/docs/manual/reference/operator/query/