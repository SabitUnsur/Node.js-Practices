const winston = require('winston');
const {label,timestamp} = winston.format;

const dailyRotate = require('winston-daily-rotate-file');

//Kendi log formatımızı oluşturmak için

const myFormat = winston.format.printf(({level,message,label,timestamp})=>{
    return `${timestamp} - ${label} - ${message} - ${level}`;
})

const Logger = winston.createLogger({
    defaultMeta : { api : 'myApi'},
    format:winston.format.combine(
        label({label:'myLabel'}),
        timestamp(),
        myFormat
    ),
    transports:[ //transports is an array of transport objects
        // new winston.transports.Console(), //Console logging
        // new winston.transports.File({filename:'app.log',level:'error'}) //File logging

        new dailyRotate({
            datePattern:'DD-MM-YYYY',
            filename:'app-%DATE%.log',
            dirname:'./logs',
         })
    ]
})

class MyLogger{
    LogError(message){
        Logger.error(message)
    }
    LogInfo(message){
        Logger.info(message)
    }
    LogWarning(message){
        Logger.warn(message)
    }
}

module.exports = MyLogger;