const zlib = require('zlib');
const gzip = zlib.createGzip(); // dosyayı sıkıştırır
const fs = require('fs');
const input = fs.createReadStream('index.txt.gz'); //dosya okur
input.on('data', (data) => {
    console.log(data.toString()); 
}) //input.on ile okuma işlemi yapılır
console.log(input);

const out = fs.createWriteStream('test.txt.gz'); //dosya yazar
input.pipe(gzip).pipe(out); //pipe ile dosya okuma ve yazma işlemi yapılır
