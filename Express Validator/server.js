//Express Validator : https://express-validator.github.io/docs/ 
// Ne işe yarar : Kullanıcıdan gelen verileri kontrol etmek için kullanılır. Orm araçlarına yük bindirmemek amaçlanmıştır.

const express = require('express')
const app = express()
const router = express.Router()
const {validateUser} = require('./validators.middleware')
const validationResult = require('express-validator')

app.use(express.json())
app.use(router)

app.listen(3000, () => {
    console.log('Server is running')
})

router.post('/createuser',validateUser.validateUser(),(req, res) => { 
    const {username,password} = req.body
    const errors = validationResult(req)
    console.log(errors)
    console.log(username,password )
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
})

router.get('/getuser/:userId',validateUser.validateGetUserById() , (req, res) => {
    const errors = validationResult(req)
})

router.get('/getuserByQuery/:userId',validateUser.validateQuery() , (req, res) => {
    const errors = validationResult(req)
})