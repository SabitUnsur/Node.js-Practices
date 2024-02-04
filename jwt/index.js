const express = require('express')
const app = express()
const router = express.Router()
const jwtMiddleware = require('./jwtMiddleware')
app.use(router)
app.use(express.json())
app.use(jwtMiddleware)

router.post('/login', (req, res,next) => {
   //dbye bak kullanıcıyı bul ve token olustur
    const {username,password} = req.body;
   const token = jwt.sign({
    ad: username,
    id:Date.now(),
    issuer: 'www.sabit.com',
    audience: 'sabit.com',})

    res.json({ name:  username,password : password,token:token})
})


router.get('/users', (req, res,) => {
    //console.log(req.headers) // token varsa burada olur
    res.send('başarılı giriş')
})


app.listen(3000, () => console.log('Example app listening on port 3000!'))