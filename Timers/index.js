const timers = require('timers');

timers.setInterval(()=>{
    console.log(Date.now());
    console.log(new Date());
},1000) //belirli aralıklarla çalışır

timers.setTimeout(()=>{
    console.log('5 saniye sonra çalıştı');
},5000) //belirli bir süre sonra çalışır, bir kere çalışır

// timer.setImmediate => kuyruğa eklenir, bir kere çalışır