const express = require('express')
const app = express()
const appRouter = require('/router/router')
app.use(appRouter)
app.set('view engine','ejs')    
app.use('/assets',path.join(express.static(__dirname + '/assets'))) 

app.listen(5000,()=>{
    console.log(`Proje http://localhost:5000 adresinde başlatıldı.`)
})  

