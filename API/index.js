const express = require('express');
const path = require('path');
const app = express();
const router = express.Router();

const data = [
    {
        id:1,
        ad: 'Mehmet',
        soyad: 'Kara',
    },
    {
        id:2,
        ad: 'Ahmet',
        soyad: 'Kara',
    },
    {
        id:3,
        ad: 'Ayşe',
        soyad: 'Kara',
    }
]

router.get('/', (req, res) => {
    res.status(200).json({ message: 'Hello World' });
    res.send('Hello World');
    res.status(200).send('Hello World');
    res.sendFile(path.join(__dirname + '/index.html'));
    res.cookie('myCookie','deneme',{expires: new Date(Date.now() + 900000),domain:'localhost',httpOnly:true})
    res.redirect('http://localhost:5000/users-list')
    res.append('Set-Cookie','foo=bar; Path=/; HttpOnly') //2. yol
    res.attachment(path.resolve('./index.txt'))
    res.sendFile(path.join(__dirname + '/index.txt')) //burada dosyayı ilgili urle gidince indirir
    res.download(path.join(__dirname + '/index.txt')) //burada da dosyayı indirir
    res.header('test','merhaba')
    res.send('tamam')
    res.links({
        firstLink : 'http://localhost:5000/?page=1',
        secondLink : 'http://localhost:5000/?page=2'})
    res.send('ok')
})

router.get('/users-list', (req, res) => {
    console.log('url', req.url);
    console.log('ctype',req.is('html'))
    console.log('getType',req.get('content-type'))
    console.log('host',req.hostname)
    console.log('headers',req.headers)
    console.log('protocol',req.protocol)
    console.log('isSecure',req.secure)
    res.status(200).json(data);
})

router.post('/users-create', (req, res) => {
    console.log(req.body);
    body.id = data.length + 1;
    data.push(req.body);
    res.status(201).json(req.body);
})

router.delete('/users-delete/:userId',(req,res)=>{
    const userId = req.params.userId
    const recordToDelete = data.filter((user=> {
        return user.id !== Number(userId)
    }))

    data.pop(recordToDelete)

    res.status(200).json({message:userId + 'id li kullanıcı silindi'})
})

router.put('/users-update/:userId',(req,res)=>{ 
    const body = req.body
    const findedIndex = data.findIndex((user)=>{
        return user.id == Number(req.params.userId)
    })
    data[findedIndex] = body
    res.status(200).json({message: body.id + 'id li kullanıcı güncellendi'})
}) 

app.use(router)
app.use(express.json());

app.listen(5000, () => {
    console.log('server started');
})