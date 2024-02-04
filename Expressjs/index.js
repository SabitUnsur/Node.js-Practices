const express = require('express')
const app = express() // bir express server (uygulamayı) oluşturduk ve app değişkenine atadık.
const fs = require('fs') // fs modülünü dahil ettik. Html dosyalarını okumak için kullanacağız.

app.use('/assets',express.static('assets')) //assets dizinini statik olarak kullanacağımızı belirttik. Bu sayede assets dizinindeki dosyaları url ile erişebileceğiz.
//bu şekilde kullanmadan css dosyalarını okuyamayız. Çünkü express.js css dosyalarını okumaz. Bu yüzden assets dizinini statik olarak kullanmamız gerekiyor.


 //kök dizinine gelen isteklerde Hello World! yazısını gönderdik.
 // get metodu ile bir istek oluşturduk. 
 //İlk parametre isteğin hangi url ile geleceğini belirtir. İkinci parametre ise isteğe cevap olarak ne döneceğini belirtir. req istek, res ise cevap anlamına gelir.
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
  }) 

app.get('/getjson',(req,res)=>{
    res.json({id:1,name:'Mehmet',surname:'Kara'})
})

app.get('/user', (req, res) => {
    res.sendFile(__dirname + '/user.html')
  })
  
  app.get('/test', (req, res) => {
    res.redirect('/user') // /test urline gelen istek /user urline yönlendirilir.
    //res.sendFile(__dirname + '/test.html')
  })


 app.get('/deneme',(req,res)=>{
    res.send('Get Request')
 })

 app.post('/deneme',(req,res)=>{
    res.send('Post Request')
 })

 app.put('/deneme',(req,res)=>{
    res.send('Put Request')
 })

app.delete('/deneme',(req,res)=>{
    res.send('Delete Request')
})

app.listen(5000,()=>{
    console.log(`Proje http://localhost:5000 adresinde başlatıldı.`)
})

