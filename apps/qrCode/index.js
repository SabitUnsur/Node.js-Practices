const qrCode=require('qrcode-terminal')
const readline = require('readline');
const process = require('process');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Qr ne icin olusturulsun ? \r\n', (answer) => { 
    qrCode.generate(answer, {small: true})
    rl.close()
});