let io 
const socket = require('socket.io')
// let,const ve var arasındaki farklar nelerdir? -> cevap : let ve const block scope, var ise function scope'dur
//let ve const farkı ise let değişkeni tekrar tanımlanabilirken, const değişkeni tekrar tanımlanamaz.

module.exports = {
    init: (server) => {
        io = socket(server, {
            path: "/my-custom-path/", //path, burada belirtilen yola göre socket.io'nun çalışmasını sağlar ve bu yolla belirtilen yoldan gelen istekleri dinler.
            pingTimeout: 60000, //pingTimeout, sunucunun bir istemciye yanıt vermemesi durumunda istemciyi bağlantıdan çıkarmak için kullanılır.
            cors: {
                origin: '*',
                method: ['GET']
            }

        })
        return io
    },
    getIO:()=>{
        if(!io){
            throw new Error('Socket.io not initialized')
        }
        return io
    }
}