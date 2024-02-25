const amqp = require('amqplib');
const rabbitmqConnection = require('./rabbitmqConnection');
const KEY = 'emailKuyrugu' 

const onConsumeData = async () => { 
            const connection = await rabbitmqConnection();
            const channel = await connection.createChannel();
            await channel.assertQueue(KEY);
            channel.consume(KEY, (msg) => {
                console.log(JSON.parse(msg.content.toString()))  
                const _data = JSON.parse(msg.content.toString())
                setTimeout(() => {
                    console.log('email sent to ' + _data.email + ' at ' + _data.Date)
                    //email gönder gelen veriyi
                    //2 saat sonra hazırlayıp vereceğiz 48 saat de sürebilir vs.
                    //dosyaları hazırla,soket bağlantısı kur,veriyi gönder
                    channel.ack(msg)
                }, 5000);
            });           
}

onConsumeData()