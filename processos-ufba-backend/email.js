'use strict';
const nodemailer = require('nodemailer');

// async..await is not allowed in global scope, must use a wrapper
async function enviarEmail(usuario, hash) {
    const url = "http://localhost:3000/reset/"

    const emailText=`<p>Olá ${usuario.nomeCompleto} <p> Caso tenha solicitado a recuperação da sua senha clique no link abaixo para o cadastro de uma nova senha <p> <a href=${url + hash}>${url + hash}</a> <p> <p> <p> SIAPUFBA <p> <a href="https://disciplinas.dcc.ufba.br/MATC84/WebHome"> MATC84 - DCC - UFBA</a>`

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: '', 
            pass: ''
        }
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"Sistema de cadastro de processo UFBA" <siapeufba@gmail.com>', // sender address
        to: usuario.email, // list of receivers
        subject: 'Recuperação de Senha', // Subject line
        html: emailText
    });

    console.log('Message sent: %s', info.messageId);
    console.log(info);
    
}

module.exports = enviarEmail;