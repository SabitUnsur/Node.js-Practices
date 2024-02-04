const jwt = require('jsonwebtoken');
const token = jwt.sign({
    ad: 'Sabit',
    soyad: 'Ünsür',
    id:1,
    issuer: 'www.sabit.com',
    audience: 'sabit.com',
}, 'sabitunsur', { expiresIn: '2h' });

console.log('token',token);


const t =  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZCI6IlNhYml0Iiwic295YWQiOiLDnG5zw7xyIiwiaWQiOjEsImlzc3VlciI6Ind3dy5zYWJpdC5jb20iLCJhdWRpZW5jZSI6InNhYml0LmNvbSIsImlhdCI6MTcwNjI5ODM5NSwiZXhwIjoxNzA2MzA1NTk1fQ.PkJD2XECjOPNzYFLYZYEhRJsY8NP3Ig8sHkMvJUGnkw"

jwt.verify(t,'sabitunsur',(err,decoded)=>{
    if(err){
        console.log('err',err.name);
    }else{
        console.log('decoded',decoded);
    }
})