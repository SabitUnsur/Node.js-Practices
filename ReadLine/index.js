const readLine = require('readline');
const process = require('process');

/*const rl = readLine.createInterface({ 
    input: process.stdin,
    output: process.stdout
});

rl.question('Adınız nedir? ',(answer)=>{
    console.log(`Merhaba ${answer}`);
    rl.close();
})

rl.on('SIGINT',()=>{ 
    console.log('güle güle');
})*/

const rl2 = readLine.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: '--> '
});
rl2.prompt();

rl2.on('line',(line)=>{
    switch(line.trim()){
        case 'selam':
            console.log('Nasılsın ? ');
            break; 
        default:
            console.log(`Yanlış komut `);
            break;
    }
    rl2.prompt();
}).on('close',()=>{
    console.log('güle güle');
    process.exit();
})