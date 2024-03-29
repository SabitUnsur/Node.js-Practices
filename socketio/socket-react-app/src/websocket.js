import socketClient from 'socket.io-client'

let socket
const SERVER = 'http://localhost:5000'

const logToConsole = (data) => {
    console.log(data)
}

function notify(text){
    if(Notification.permission === 'granted'){
       Notification.requestPermission()
    }
    else{
        var notification = new Notification('hello', {
            body: 'Hey, yeni bir kayıt olustu, içeriğe bir göz at!' + text
        })
        notification.onclick = function (){
            window.open('http://www.google.com')
        }
    }
}

export const connectWebSocket = () => {
    socket = socketClient(SERVER,{
        timeout:50000,
        reconnectionDelay:3000,
        path:"/my-custom-path/",
        extraHeaders:{
        "my-custom-header":"1234"
        }})
    socket.on('onConnect', (data) => {
        console.log('data',data)
        window.socketID = data
    })
    socket.on('hey', (data) => {
        console.log('data',data)
    })

    socket.on('publicMessage', (data) => {
        if(data.id !== window.socketID) {
            console.log('Public Mesaj = ',data)
        }

    }) // serverdan gelen publicMessage eventini dinliyoruz

    socket.on('publicMessage2', (data) => {
        if(data.id !== window.socketID) {
            console.log('Public Mesaj = ',data)
        }
    })

    socket.on('joinedRoom',(data)=>{
        console.log('data',data)
    })

    socket.on('roomMessage',(data)=>{
        console.log('data',data)
    })

    socket.on('message',(data) => {
        console.log('Spesifik Mesaj = ',data)
    })

    //socket.once('time',logToConsole)
    //socket.off('time',logToConsole)
    //socket.removeListener('time')
    //removeAllListeners()

    socket.on('newRecord', (data) => {
        if(data.id !== window.socketID) {
            notify(data.text)
            console.log('Yeni bir kayıt olustu'+ data.text)
        }
    })// serverdan gelen newRecord eventini dinliyoruz
}

export {socket}
