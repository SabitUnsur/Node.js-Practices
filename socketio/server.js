const express = require('express')
const socketIO = require('./socket')
const app = express()
const router = express.Router()
const cors = require('cors')
app.use(router)
app.use(express.json())
app.use(cors())

let arr = []

let clients = []
let rooms = {
    roomA: [],
    roomB: [],
}

let connectionUsers = []
let data = []

const server = app.listen(5000, () => {
  console.log('Server is running on port 5000')
})

router.get('/', (req, res) => { 
    res.json({data:arr})
    socketIO.getIO().sockets.emit('newRecord',{id:req.query.id, text:req.query.text}) 
})//socket.io ile bağlantı kurulduktan sonra, yeni bir kayıt eklendiğinde, tüm istemcilere yeni kaydı göndermek için kullanılır. 
//getIO : socket.io'nun içindeki io nesnesine erişmek için kullanılır ve bu nesne, tüm istemcilerle iletişim kurmak için kullanılır.


router.get('/sendPhoto', (req, res) => { 
    res.json({data:arr})
    socketIO.getIO().sockets.emit('broadcastPhoto',{id:req.query.id, photo:req.query.photo}) 
})

const io = socketIO.init(server)

io.on('connection', (socket) => { 

    connectionUsers.push({socketId:socket.id,connectionTime: Date.now()})

    clients.push({socketId:socket.id})

    console.log(socket.handshake.headers)
    console.log('Socket connection established', socket.id) //buranın bir client yani react vs. tarafından bağlanılması gerekiyor
   // console.log(socket.handshake) handshake nedir? -> cevap : handshake, socket.io'nun bir parçasıdır ve bağlantı sırasında kullanıcıdan gelen verileri içerir.

    socket.on("disconnect", (reason) => {
       let arr = [...connectionUsers]
       let findedDisconnectUser= arr.find((item)=> item.socketId === socket.id)
       findedDisconnectUser.disconnectionTime = Date.now()
       findedDisconnectUser.time = findedDisconnectUser.disconnectionTime - findedDisconnectUser.connectionTime
       connectionUsers = arr.filter((item) => item.socketId !== socket.id) 

        console.log(reason)
        console.log('Socket disconnected', socket.id)
        let roomA = rooms.roomA.filter((item)=> item !== socket.id)
        rooms={...rooms, roomA:roomA} //roomA'dan çıkan kullanıcıyı silme
        io.sockets.emit('joinedRoom',rooms)
    })

    socket.emit('onConnect',socket.id)

    socket.emit('hey','hi, this is a message from server, the time you connected to socket ' + Date.now()) //serverdan clienta mesaj gönderme

    socket.on('client',(data)=>{
        console.log(data)
    })

    socket.on('sendCustomMessage',(data)=>{ 
        console.log(data)
        io.to(data.socketId).emit('message',data.message)
    })

    socket.on('publicMessage',(data)=>{ 
        socket.broadcast.emit('publicMessage',data)
        io.sockets.emit('publicMessage2',data) //2.yol
    }) //publicMessage, tüm istemcilere gönderilir.


    socket.on('join room',(roomName)=>{
        socket.join(roomName) //socket.join, bir odaya katılmak için kullanılır.
        rooms[roomName].push(socket.id)
        io.sockets.emit('joinedRoom',rooms)
     })

     setInterval(()=>{
        data = []
        for(let i = 0; i < 6; i++){
            data.push(Math.floor((Math.random() * 1000) + 1))
        }
        socket.emit('dataResult',data)
     },5000)

     socket.on('message room',(data)=>{
        io.to(data.room).emit('roomMessage',data.message)
     })

})