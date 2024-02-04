const { Sequelize } = require('sequelize')
const db = {}
const sequelize = new Sequelize('sequelizedb', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    pool: 40,
    logging: true,
    retry: 3
})

db.Sequelize = Sequelize
db.sequelize = sequelize

db.connect = async () => {
   return new Promise(async (resolve, reject) => {
    try {
        setTimeout(async () => {
            await db.sequelize.authenticate({ logging: true })
            console.log('Connection to db successful')
            resolve(db) //resolve ne işe yarıyor ?? Cevap: Promise objesinin durumunu fulfilled olarak değiştirir ve sonucu döndürür. 
        }, 2000)
    } catch (error) {
        console.log('Connection to db failed')
        reject(error)
    }
})
}

db.CreateTables = async () => {
   const Test = require('../models/test-model')
    const User = require('../models/user-model')
    const Socials = require('../models/social-model')
    //TestModel.sync({force: true}) // force: true ile tablo her seferinde silinip yeniden oluşturulur.
    User.hasMany(Socials,{foreignKey: 'user_id'})
    Socials.belongsTo(User)
    sequelize.sync({force: true}) // her model ismi ile yazmaktan kurtulduk 
}

module.exports = db

