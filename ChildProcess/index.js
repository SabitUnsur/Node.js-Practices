const {spawn,exec} = require('child_process');

const myEcho = spawn('cmd.exe',['/c','echo selam']);
myEcho.stdout.on('data',(data)=>{
    console.log(data.toString());
})

const otherJs = exec('node other.js')
otherJs.stdout.on('data',(data)=>{
    console.log('other',data.toString());
})

const desktop = exec('cd C:\\Users\\user\\Desktop && dir')
desktop.stdout.on('data',(data)=>{
    console.log('desktop',data.toString());
})
