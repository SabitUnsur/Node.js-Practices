const process = require('process');
const childProcess = require('child_process');

process.on('beforeExit',()=>{
    console.log('beforeExit');
})

process.on('exit',()=>{
    console.log('exit');
})

process.on('SIGINT',()=>{
    console.log('kullanıcı kapatmaya çalıştı'); //ctrl+c ile kapatıldığında çalışır
    process.exit(); // programı sonlandırır 
})

console.log('selam') // selam yazar ve program sonlanır

console.log(process.argv); // node index.js 1 2 3 4 5 6 7 8 9 10
console.log(process.arch); 
console.log(process.platform)
console.log(process.pid)
console.log(process.cpuUsage())

childProcess.exec('tasklist',(err,stdout,stderr)=>{
    console.log(stdout); // çalışan tüm processleri listeler. 
})

// process.kill(id) => idsi verilen prosesi sonlandırır