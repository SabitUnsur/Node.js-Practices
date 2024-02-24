const { createClient } = require('redis')

const client = createClient()

client.connect().then((res) => {
    console.log('res', res)
    client.set('1', 'test')
    client.set('2', 'test')

    client.set('mydata', Date.now()).then((v) => {
        console.log('v1', v)
    })
    client.set('mydata2', "Yasin").then((v) => {
        console.log('v2', v)
    })
    client.set('mydata3', JSON.stringify({ id: 1, text: 'Ali' })).then((v) => {
        console.log('v3', v)
    })

    client.setEx('testKey', 10, 'ayşe').then((r) => {
        console.log('r', r)
    })

    client.get('mydata').then((r) => {
        console.log('r', r)
    })
    client.get('mydata2').then((r) => {
        console.log('r', r)
    })
    client.get('mydata3').then((r) => {
        console.log('r', r)
    })
    client.get('mydata4').then((r) => {
        console.log('r', r)
    })

    // client.del('mydata3').then((r) => {
    //     console.log('r', r)
    // })
    // client.del(['mydata', 'mydata2']).then((r) => {
    //     console.log('r', r)
    // })

    client.sendCommand(['GET', 'mydata3']).then((r) => {
        console.log('r', r)
    })
    client.sendCommand(['PING']).then((r) => {
        console.log('r', r)
    })

}).catch((err) => {
    console.log('err', err)
})

client.on('connect', () => {
    console.log('connect')
})

client.on('ready', () => {
    console.log('ready')
})
client.on('error', () => {
    console.log('hata')
})