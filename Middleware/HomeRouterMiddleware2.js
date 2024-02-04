module.exports = (req,res,next) => {
    if(req.query.ad == 'sabit'){
        next()
    } else{
        res.send('isim sabit degil')
    }
}