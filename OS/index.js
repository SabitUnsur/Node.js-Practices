const os = require('os');

console.log('sabit' + os.EOL + 'ünsür'); //satır sonu karakteri. işletim sistemine göre değişir
console.log(os.arch()); //işlemcinin mimarisini verir
console.log(os.cpus()); //işlemcinin bilgilerini verir
console.log(os.freemem()); //boş ram miktarını verir
console.log(os.homedir()); //kullanıcının ana dizinini verir
console.log(os.hostname()); //bilgisayarın adını verir
console.log(os.networkInterfaces()); //ağ bilgilerini verir
console.log(os.platform()); //işletim sistemini verir
console.log(os.tmpdir()); //geçici dosya dizinini verir
console.log(os.totalmem()); //toplam ram miktarını verir
console.log(os.type()); //işletim sistemini verir
console.log(os.uptime()); //bilgisayarın açık kalma süresini verir
console.log(os.userInfo()); //kullanıcı bilgilerini verir
console.log(os.version()); //işletim sistemi sürümünü verir