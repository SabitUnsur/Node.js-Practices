const url = require('url');
const myUrl = new URL('https://www.google.com.tr/?searchQ=abc')
console.log(myUrl.href);
console.log(myUrl.pathname);
console.log(myUrl.hash);
console.log(myUrl.hostname);
console.log(myUrl.port);
console.log(myUrl.protocol);

console.log(myUrl.searchParams.get('searchQ'));
console.log(myUrl.searchParams.has('searchQ'));

const adres = 'https://localhost:4545/abc/?ad=ali&soyad=veli';
console.log(url.parse(adres))

