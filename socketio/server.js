const express = require('express')
const socketIO = require('./socket')
const app = express()
const router = express.Router()
app.use(router)


const server = app.listen(5000, () => {
  console.log('Server is running on port 5000')
})

router.get('/', (req, res) => { 
    res.send('Server is up and running')
})

const io = socketIO.init(server)

io.on('connection', (socket) => { 
    console.log(socket.handshake.headers)
    console.log('Socket connection established', socket.id) //buranın bir client yani react vs. tarafından bağlanılması gerekiyor
   // console.log(socket.handshake) handshake nedir? -> cevap : handshake, socket.io'nun bir parçasıdır ve bağlantı sırasında kullanıcıdan gelen verileri içerir.
    socket.on("disconnect", (reason) => {
        console.log('Socket disconnected', reason)
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

    setInterval(()=>{
        socket.emit('time', Date.now())
    },1000)
})