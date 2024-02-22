const nodeMailer = require('nodemailer')
const path = require('path')

const transporter = nodeMailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'testmail@gmail.com',
        pass: 'testpassword'
    }
})

transporter.sendMail({ 
    from: 'testmail@gmail.com',
    to: 'sabitunsur@gmail.com',
    subject: 'Test Mail',
   // text: 'This is a test mail'
    html: '<h1>This is a test mail</h1>',
    attachments: [
        {
            filename: 'test.txt',
            path: path.join(__dirname,'/test.txt')
        }
    ]

},(err,res) =>{
    if(err){
        console.log(err)
    }else{
        console.log(res)
    }
})