import socketClient from 'socket.io-client'

let socket
const SERVER = 'http://localhost:3000'

const logToConsole = (data) => {
    console.log(data)
}
export const connectWebSocket = () => {
    socket = socketClient(SERVER,{
        timeout:50000,
        reconnectionDelay:3000,
        path:"/my-custom-path/",
        extraHeaders:{
        "my-custom-header":"1234"
        }})
    socket.on('hey', (data) => {
        console.log('data',data)
    })
    socket.once('time',logToConsole)
    //socket.off('time',logToConsole)
    //socket.removeListener('time')
    //removeAllListeners()
}

export {socket}
