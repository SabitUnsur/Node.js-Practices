const path = require('path');
console.log(path.extname('C:\Users\sabit\OneDrive\Masaüstü\NodeJs\Path\index.js')); // bu kod bize dosya uzantısını verir.
console.log(path.basename('C:\Users\sabit\OneDrive\Masaüstü\NodeJs\Path\index.js'));  // bu kod bize dosya adını verir.
console.log(path.dirname('C:\Users\sabit\OneDrive\Masaüstü\NodeJs\Path\index.js')); // bu kod bize dosya yolunu verir.

const pathFormat = path.format({
    root: '/test/',
    name: 'file',
    ext: '.txt'
})
console.log(pathFormat); // bu kod bize dosya yolunu verir.
console.log(path.join,'/abc','test','deneme/y','z'); //verilen yolları birleştirir.
console.log(path.parse,'C:\Users\sabit\OneDrive\Masaüstü\NodeJs\Path\index.js') // dosya yolunu parçalara ayırır.
console.log(path.resolve,'/a','b','c') // dosya yolunu çözümler.
console.log(path.resolve,'/a','/b','c') //çıktı olarak /b/c verir.
console.log(path.resolve,'/a','/b','/c') //çıktı olarak /c verir. 

