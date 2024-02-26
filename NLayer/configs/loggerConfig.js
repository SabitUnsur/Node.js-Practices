const winston = require('winston')
const { timestamp, json, prettyPrint,colorize,label,combine } = winston.format
const dailyRotateFile = require('winston-daily-rotate-file')

const logConfig = {
    defaultMeta: {
        api: "NODE SERVER",
    },
    level: "verbose",
    transports: [new dailyRotateFile({
        filename: '%DATE%.log',
        datePattern: 'YYYY-MM-DD',
        dirname: './logs/',
    })],
    format: combine(
        label({ label: "Uygulama V1" }), 
        timestamp(),
        json(),
        prettyPrint(),
        colorize()
    )
}

module.exports = logConfig