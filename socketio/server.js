const express = require('express')
const socketIO = require('./socket')
const app = express()
const router = express.Router()
app.use(router)


const server = app.listen(3000, () => {
  console.log('Server is running on port 3000')
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

    socket.emit('hey','hi, this is a message from server, the time you connected to socket ' + Date.now()) //serverdan clienta mesaj gönderme

    socket.on('client',(data)=>{
        console.log(data)
    })

    setInterval(()=>{
        socket.emit('time', Date.now())
    },1000)
})