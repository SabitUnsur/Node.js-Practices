const router = require('express').Router()
const controller = require('../controller/indexController')
const userController = require('../controller/userController')

router.use((req,res)=>{
    res.status(404).json({message:'Sayfa bulunamadı',statusCode:404})
}) //router.use ile tüm isteklerde çalışacak bir middleware tanımladık. Bu middleware sayesinde tüm isteklerde 404 hatası dönecek.


router.get('/',controller.Index) //router.get ile gelen isteklerin hangi metoda karşılık geleceğini belirledik. Bu durumda gelen isteklerde Index fonksiyonu çalışacak.
router.get('/:markaAdi/arac/:sehirAdi',controller.GetParameters) 
router.post('/',controller.Post )
router.delete('/',controller.Delete)
router.put('/',controller.Put)
router.get('/user',userController.Index)


module.exports = router //router modülünü dışarı aktardık.