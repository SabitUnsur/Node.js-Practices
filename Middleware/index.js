const express = require ('express');
const app = express();
const router = express.Router();
const homePageMiddleware = require('./HomeRouteMiddleware');  
const homePageMiddleware2 = require('./HomeRouteMiddleware2');  
const globalMiddleware = require('./GlobalMiddleware');

router.get('/', [homePageMiddleware,homePageMiddleware2], (req,res) => { //burada route bazlı middleware kullanıyoruz
    res.send('Hosgeldin!');
})


router.get('/test', (req, res) => {
    res.send('Hello World2!');
})

router.get('/merhaba', (req, res) => {
    res.send('Hello World3!'); //biz bunun middlewareye takılmasını istemiyoruz ancak bu sekilde takılıyor. 
})

// app.use((req,res,next) => {
//     console.log('Middleware 1 working') //uygulama çalışırken burdan geçiyor ancak next ile bir sonraki middleware e geçiyor yazmassak kalıyor
//     next()
// })

// app.use((req,res,next) => {
//     console.log('Middleware 2 working')
//     next()
// })

app.use(globalMiddleware) //global middleware kullanıyoruz
app.use(router) // middleware olarak router kullanıyoruz 


app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
})