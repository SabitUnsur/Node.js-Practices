module.exports = (req,res,next) => {
    if(!req.url.includes('/merhaba'))
    {
        if(req.query.ad == 'sabit'){
            next()
        } else{
            res.send('isim sabit degil')
        }  
    }else{
        next()
    }
}