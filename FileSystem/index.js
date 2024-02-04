const fs = require('fs');

fs.writeFile('index.txt','merhaba nodejs',(err) => {
    console.log(err);
});

fs.writeFileSync('index.txt','merhaba nodejs',(err) => {
    console.log(err);
});

fs.appendFile('index.txt','selam',(err) => {
    console.log(err);
}) //dosyanın içine son kısımdan ekleme yapar

fs.open('index.txt','w',(err,fd) => {}) 
//dosya açar  w yazma modu a eklemek için kullanılır. r okuma modu için kullanılır. 
//r+ hem okuma hem yazma modu için kullanılır. a+ hem okuma hem yazma modu için kullanılır.
// a dosya yoksa oluşturur varsa içine ekler. x dosya yoksa oluşturur varsa hata verir.

fs.readFile('index.txt',(err,data) => {
    console.log(data.toString());
 }) //dosya okur

 fs.unlink('index.txt',(err) => {}) //dosya siler

 fs.copyFile('index.txt','index2.txt',(err) => {}) //dosya kopyalar

 fs.rename('index.txt','index2.txt',(err) => {}) //dosya adını değiştirir

 fs.mkdir('a/b/c',{recursive:true},(err) => {}) //klasör oluşturur

 fs.opendir('./',(err,data) => {
    for await (const dirent of data) {
        console.log(dirent.name);
        console.log('isFile',dirent.isFile(),'isDirec',dirent.isDirectory()); //file mi directory mi
    }
 }) //klasör açar

 fs.readdir('./',(err,data) => {}) //klasör okur

 console.log(fs.existsSync('index.txt')); //dosya var mı yok mu kontrol eder

 fs.stat('index.js',(err,stats) => {
    console.log('err',err);
 })

 fs.watchFile('index.txt',(curr,prev) => {
    console.log(curr);
    console.log(prev);
 }) //dosya değişikliğini izler