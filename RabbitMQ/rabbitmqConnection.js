const amqp = require('amqplib');

module.exports = async function rabbitmqConnection() {
    const connection = amqp.connect({
        password: 'guest',
        username: 'guest',
    }).catch(console.warn);
    return connection;
}    