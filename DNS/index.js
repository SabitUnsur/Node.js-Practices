const dns = require('dns');
const os = require('os');

dns.lookup('google.com',(err,address,family)=>{
    console.log(address,family);
}) // returns an IP address

dns.resolve('google.com',(err,address)=>{
    console.log(address);
}) // returns an array of IP addresses

console.log('local IP',dns.getServers()); // returns an array of IP addresses 

dns.lookup(os.hostname(),(err,address,family)=>{
    console.log(address,family);
})
