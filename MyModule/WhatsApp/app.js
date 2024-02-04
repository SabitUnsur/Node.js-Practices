const {Sequelize,DataTypes} = require('sequelize')
const {Client} = require('whatsapp-web.js')
const sequelize = new Sequelize('whatsappdb','root','', {
    host: 'localhost',
    dialect: 'mysql'
})

const qrCode = require('qrcode-terminal')
let MESSAGES;
const client = new Client()

const connectToDb = async () => {
 try {
    await sequelize.authenticate()
    MESSAGES = sequelize.define('Message',{
        from: {
            type:DataTypes.STRING
        },
        messageContent: {
            type:DataTypes.STRING
        }
    })
    //MESSAGES.sync({force:true}) //bu kod ile tablo oluşturulur

    client.on('qr', (qr) => {
        qrCode.generate(qr, {small: true}) 
    })
    client.on('ready',()=>{
        console.log('Client is ready')  //telefon bağlandığında çalışır
    })

    client.initialize() //qr kodu okutulduktan sonra çalışır

    client.on('message',async msg=>{
        console.log(msg)
        await MESSAGES.create({
            default: 'sticker received',
            from:msg.from,
            messageContent:msg.body
        })
    })

 } catch (error) {
    console.log('Db connection error')  
 }
}

connectToDb()