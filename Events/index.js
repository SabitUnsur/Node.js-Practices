const events = require('events');

const eventEmitter = new events.EventEmitter();

const startListener = (data)=>{
    console.log(`start : ${data}`);
}

eventEmitter.addListener('start',startListener); //start eventi tetiklendiğinde startListener metodu tetiklenir

eventEmitter.on('end',(data)=>{
    console.log(`end : ${data}`);
})

const forLoop = ()=>{
    eventEmitter.emit('start',Date.now()); //burdan startListener tetiklenir ve start : olarak ilgili zamanı yazar
    for(let i=0;i<10;i++){
    }
    eventEmitter.emit('end',Date.now());
}   

forLoop();

eventEmitter.removeAllListeners('start',startListener);
eventEmitter.setMaxListeners(2); // max listeners is 2 