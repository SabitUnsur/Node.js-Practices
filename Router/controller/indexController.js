const Index = (req,res) => {
    res.render('index',{title:'Anasayfa' , myArr: [{id:1},{id:2}]})
} 

const GetParameters = (req,res) => {
    console.log(req.params,req.query)
    /*const parameter = req.params 
    console.log(parameter.markaAdi)
    console.log(parameter.sehirAdi)
    const query = req.query
    console.log(query.min,query.max) //query stringte main=3000 & max = 5000 gibi sorgu için çıktıda 3000 5000 verdi
    res.sendFile(__dirname + '/parameter.html')*/
    res.render('parameter',{title:'Parametreler',min:req.query.min,max:req.query.max })
}

const Post=(req,res)=>{
    res.status(201).json({message : 'İşlem başarılı'})
}

const Delete=(req,res)=>{
    res.json({message : 'İşlem başarılı'})
}

const Put = (req,res)=>{
    res.json({message : 'İşlem başarılı'})
}

module.exports = {
    Index,
    GetParameters,
    Post,
    Delete,
    Put 
}