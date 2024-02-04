const mongodb = require('mongodb')
const client = mongodb.MongoClient

const createConnection = () => {
    return new Promise((resolve) => {
        client.connect('mongodb://localhost:27017', (err, db) => {
            const mydb = db.db('egitimdb', { logger: (l) => { console.log('l', l) } })
            console.log('success connect')
            resolve(mydb)
        })
    })
}


module.exports = { createConnection }