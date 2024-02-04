const http = require('http');
const fs = require('fs');

http.createServer((req,res)=>{
    res.writeHead(200,{'Content-Type':'text/html'})
    fs.readFile(req.url.split('/')[1],(err,data)=>{
        if(err){
        res.writeHead(404); 
        res.end('Sayfa bulunamadı');
        return
    }
        res.write('<h1>Http responding</h1>');   
        res.end(data); 
    })

}).listen(1234) //1234 is the port number